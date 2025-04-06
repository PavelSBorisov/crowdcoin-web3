import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false
  }

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.createRequest(
        description, 
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({
        from: accounts[0]
      });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`)

    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <h3>Create a Payment Request</h3>
        
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              placeholder="e.g. Battery supplier payment."
              value={this.state.description}
              onChange={(event) => this.setState({ description: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Value</label>
            <Input 
              placeholder="1"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
              label="ether"
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient Address</label>
            <Input 
              placeholder="0x1234567890abcdef..."
              value={this.state.recipient}
              onChange={(event) => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>
          <Message error header="Something went wrong" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Create Request</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;