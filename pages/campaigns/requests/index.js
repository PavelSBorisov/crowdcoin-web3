import React, { Component } from "react";
import { 
  Card,
  Grid,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody
} from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign"
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    // Process requests to make them serializable as they default to BigInt
    const serializable = requests.map(req => ({
      description: req.description,
      value: req.value.toString(),
      recipient: req.recipient,
      complete: req.complete,
      approvalCount: req.approvalCount.toString()
    }));

    
    return { address, requests: serializable, requestCount: requestCount.toString(), approversCount: approversCount.toString() };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
          <h3>Requests List</h3>

          <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <a>
              <Button primary floated="right" style={{ marginBottom: 10}}>Add Request</Button>
            </a>
          </Link>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Recipient</TableHeaderCell>
                <TableHeaderCell>Approval Count</TableHeaderCell>
                <TableHeaderCell>Approve</TableHeaderCell>
                <TableHeaderCell>Finalize</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {this.renderRows()}
            </TableBody>
          </Table>
          <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;