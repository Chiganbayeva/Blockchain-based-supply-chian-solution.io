import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import './App.css'
import { Container, Row, Col, Table } from "react-bootstrap";


class TrackingData extends Component {
    constructor() {
        super();
        this.state = {
          showComponent: false,
        };
      }
      StatusPropductAlert() {
        if (this.props.staProd === 'Product does not exist') {
          window.alert('Product does not exist!');
    
        }
      }
      render() {
        return (
          <div className="content">
            <Container fluid>
              <Row>
                <Col md={5}>

                      <Table striped hover  style={{fontSize:"12px"}}>
                        <thead>
                          <tr>
                            {this.StatusPropductAlert()}
                            {this.props.tthArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.ttdArray.map((prop, key) => {
                            return (
                              <tr key={key}>
                                {prop.map((prop, key) => {
                                  return <td key={key}>{prop}</td>;
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>

                </Col>
              </Row>
            </Container>
          </div>
        );
      }
    }
export default TrackingData;