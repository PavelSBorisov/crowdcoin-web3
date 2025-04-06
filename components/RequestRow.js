import React, { Component } from "react";
import { Table, TableRow, TableCell, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  }

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  }

  render() {
    const readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2;

    return (
      <TableRow disabled={this.props.request.complete} positive={readyToFinalize && !this.props.request.complete}>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>{this.props.request.description}</TableCell>
        <TableCell>{web3.utils.fromWei(this.props.request.value, 'ether')} eth</TableCell>
        <TableCell>{this.props.request.recipient}</TableCell>
        <TableCell>{this.props.request.approvalCount}/{this.props.approversCount}</TableCell>
        <TableCell>
          {this.props.request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </TableCell>
        <TableCell>
          {this.props.request.complete ? "Request Finalized" : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </TableCell>
      </TableRow>
    );

  }
}

export default RequestRow;