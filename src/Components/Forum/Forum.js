import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Input, Form } from 'antd';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', body: '' });

    useEffect(() => {
        axios.get('http://localhost:8080/forumquestions')
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });
    }, []);

    const handlePostSubmit = () => {
        if (newPost.title && newPost.body) {
            axios.post('http://localhost:8080/forumpost', newPost)
                .then(response => {
                    setPosts([...posts, response.data]);
                    setNewPost({ title: '', body: '' });
                })
                .catch(error => {
                    console.error('Error creating post:', error);
                });
        }
    };

    const renderItem = item => {
        if (!item) return null; 

        return (
            <List.Item
                className='bg-white mt-3'
                key={item.post_id}
                actions={[
                    <span><LikeOutlined /> {item.likes || 0}</span>,
                    <span><CommentOutlined /> {item.comments?.length || 0}</span>
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar>{item.username?.[0]}</Avatar>}
                    title={item.title || 'No Title'}
                    description={item.Username || 'Anonymous'}
                />
                {item.body}
            </List.Item>
        );
    };

    return (
        <div className='c-container p-5' style={{ padding: '20px' }}>
            <h1>Forum</h1>
            <Form layout="vertical">
                <Form.Item label="Title">
                    <Input
                        value={newPost.title}
                        onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Body">
                    <TextArea
                        value={newPost.body}
                        onChange={e => setNewPost({ ...newPost, body: e.target.value })}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handlePostSubmit}>
                        Post
                    </Button>
                </Form.Item>
            </Form>
            <List
                itemLayout="vertical"
                size="large"
                loading={loading}
                dataSource={posts}
                renderItem={renderItem}
            />
        </div>
    );
};

export default Forum;
