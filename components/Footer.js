import React, { Component, Fragment } from "react";
import { Container, Card, Text, Row, Spacer } from "@nextui-org/react";

class Footer extends Component {
    getYear() {
        const d = new Date();
        return d.getFullYear();
    }

    render() {
        return (
            <Container fluid style={{
                // "position": "absolute",
                "width": "100%",
                "bottom": "0px",
            }}>
                <Card css={{ $$cardColor: 'black' }}>
                    <Card.Body>
                        <Row justify="center" align="center">
                            <Text style={{
                                "fontFamily": "'Alexandria', sans-serif"
                            }} h4 size={15} color="white" css={{ m: 0 }}>
                                الحقيقة تجد طريقها
                                <br />
                                Truth finds a way.
                            </Text>
                            <Spacer x={0.9}/>
                            <Text h6 size={15} color="white" css={{ m: 0 }}>
                                &copy; {this.getYear()} - Cetta & Sayan 
                                <br />
                                All rights reserved.
                            </Text>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Footer;