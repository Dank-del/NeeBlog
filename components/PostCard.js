import { Card, Col, Text, Grid } from "@nextui-org/react";


const PostCard = (props) => {
    return (
        <Grid xs={12} sm={4}>
            <a href={`/post/${props.id}`}>
            <Card
                isPressable
                isHoverable
                >
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                            {props.titleSub}
                        </Text>
                        <Text h4 color="white">
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
            </Card>
            </a>
        </Grid>
    );
}

export default PostCard;