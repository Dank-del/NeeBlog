import { Card, Col, Text, Grid } from "@nextui-org/react";
// import {  Button, Row, Link, Spacer } from '@nextui-org/react

const PostCard = (props) => {

    // const handleShare = () => {
    //     if (navigator.share) {
    //         navigator.share({
    //             title: props.title,
    //             text: props.titleSub,
    //             url: 'https://web.dev/web-share/',
    //         })
    //             .then(() => console.log('Successful share'))
    //             .catch((error) => console.log('Error sharing', error));
    //     }
    // }

    const handleReadMore = () => {
        window.location.href = `post/${props.id}`;
    }

    return (
        <Grid xs={12} sm={4}>

            <Card
                isHoverable
                isPressable
                onPress={handleReadMore}
                // onPressUp={handleShare}
            >
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                        <Text size={15} weight="bold" transform="uppercase" color="#ffffffAA">
                            {props.titleSub}
                        </Text>
                        <Text h2 color="white" style={{ textShadow: "3px 3px 3px #000000" }}>
                            {props.title}
                        </Text>
                    </Col>
                </Card.Header>
                <Card.Image
                    src={props.image}
                    objectFit="cover"
                    width="100%"
                    height={340}
                    alt="Card image background"
                />
                {/* <Row justify="center" style={{ padding: "9px" }}>
                    <Button.Group>
                        <Button onPress={handleShare}>
                            Share post
                        </Button>
                        <Button onPress={handleReadMore}>
                            Read more
                        </Button>
                    </Button.Group>
                </Row> */}
            </Card>
        </Grid>
    );
}

export default PostCard;