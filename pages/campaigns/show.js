import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from '../../ethereum/web3';
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";


class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0].toString(),
      balance: summary[1].toString(),
      requestsCount: summary[2].toString(),
      approversCount: summary[3].toString(),
      manager: summary[4].toString(),
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Campaign Manager',
        description: 'The Manager is the individual that created this campaign and can create payment requests.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (Wei)',
        description: 'You must contribute at least this much wei to become a contributor and approve payment requests.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: 'Number of Payment Requests',
        description: 'A request to withdraw money from the contract. Requests must be approved by approvers (contributors).',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of campaign contributors.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Current Balance of the Campaign (ether)',
        description: 'The balance is how much money this campaign has left to spend.',
        style: { overflowWrap: 'break-word' }
      },
    ]

    return <Card.Group items={items} />;
  }

  render () {
    return (
      <Layout>
        <div>
          <h3>Campaign Details</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {this.renderCards()}
              </Grid.Column>

              <Grid.Column width={6}>
                <ContributeForm address={this.props.address} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <a>
                    <Button primary>View Payment Requests</Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </div>
      </Layout>
    );
  }
}

export default CampaignShow;
