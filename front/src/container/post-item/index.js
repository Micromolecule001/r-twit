import { Fragment, useState, useEffect } from 'react';
import Box from '../../component/box';
import Grid from '../../component/grid';
import PostContent from '../../component/post-content';
import PostCreate from '../post-create';
import { getDate } from '../../util/getDate';

export default function Container({ id, username, text, date }) {
    const [data, setData] = useState({
        id, 
        username,
        text,
        date,
        reply: [],
    });

    const [message, setMessage] = useState('');
    const [isOpen, setOpen] = useState(false);

    const getData = async () => {
        try {
            const res = await fetch(`http://localhost:4000/post-item?id=${data.id}`);
            const resData = await res.json();

            if (res.ok) {
                const updatedData = converData(resData);
                console.log("Fetched Data:", updatedData);
                setData(updatedData);
            } else {
                setMessage(resData.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const converData = ({ post }) => ({
        id: post.id,
        text: post.text,
        username: post.username,
        date: getDate(post.date),
        reply: post.reply.reverse().map(({ id, username, text, date }) => ({
            id,
            text,
            username,
            date: getDate(date),
        }))
    });

    const handleOpen = () => {
        setOpen(!isOpen);
        if (!isOpen) {
            getData();
        }
    };

    return (
        <Box style={{ padding: "0" }}>
            <div style={{ padding: "20px", cursor: "pointer" }} onClick={handleOpen}>
                <PostContent
                    username={data.username}
                    date={data.date}
                    text={data.text}
                />
            </div>

            {isOpen && (
                <div style={{ padding: "0px 20px 20px 20px" }}>
                    <Grid>
                        <Box>
                            <PostCreate
                                placeholder={'Post your reply!'}
                                button="reply"
                                id={data.id}
                                onCreate={getData}
                            />
                        </Box>

                        {data.reply.length > 0 && data.reply.map((item) => (
                            <Fragment key={item.id}>
                                <Box>
                                    <PostContent {...item} />
                                </Box>
                            </Fragment>
                        ))}
                    </Grid>
                </div>
            )}
        </Box>
    );
}
