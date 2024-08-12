import { Fragment, useState } from 'react'

import Title from "../../component/title"
import Grid from "../../component/grid"
import Box from "../../component/box"

import PostCreate from "../post-create"
import PostItem from "../post-item"

import { getDate } from '../../util/getDate'

export default function Container() {
    const [message, setMessage] = useState("")
    console.log(message)
    const [data, setData] = useState({list: [], isEmpty: true})

    const getData = async () => {
        try {
            const res = await fetch("http://localhost:4000/post-list", {
                method: "GET"
            })

            const data = await res.json()

            if (res.ok) {
                setData(convertData(data))
            } else {
                setMessage(data.message)
            }

        } catch (error) {
            setMessage(error.message)
        }
    }

    const convertData = (raw) => ({
        list: raw.list.reverse().map(({ id, username, text, date}) => ({
            id,
            username,
            text,
            date: getDate(date),
        })),

        isEmpty: raw.list.length === 0,
    })

    return (
        <Grid>
            <Box>
                <Grid>
                    <Title> Home </Title>
                    <PostCreate 
                        onCreate={getData}
                        placeholder={"What is happening?!"}
                        button="Post"
                    />
                </Grid>
            </Box>

             <Fragment>
                {data.isEmpty ? (
                    <div> Is empty </div>
                ) : (
                    data.list.map((item) => (
                        <Fragment key={item.id}>
                            <PostItem {...item}/>
                        </Fragment>
                    ))
                )} 
            </Fragment>
        </Grid>
    )
}