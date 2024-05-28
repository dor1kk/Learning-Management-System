import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Input, Form, Layout, Menu, Modal } from 'antd';
import { LikeOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Forum.css'; // Import the CSS file for custom styling

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                    setPosts(prevPosts => [...prevPosts, response.data]);
                    setNewPost({ title: '', body: '' });
                })
                .catch(error => {
                    console.error('Error creating post:', error);
                });
        }
    };

    const fetchComments = (post_id) => {
        setSelectedPostId(post_id);
        axios.get('http://localhost:8080/comments', {
            params: { post_id }
        })
            .then(response => {
                setComments(response.data);
                setIsModalVisible(true);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    };

    const handleCommentSubmit = () => {
        if (commentBody) {
            axios.post('http://localhost:8080/comments', { post_id: selectedPostId, body: commentBody })
                .then(response => {
                    setCommentBody('');
                    fetchComments(selectedPostId);  // Refresh comments
                })
                .catch(error => {
                    console.error('Error adding comment:', error);
                });
        }
    };

    const renderItem = item => {
        if (!item) return null;

        return (
            <List.Item
                className='post-item'
                key={item.post_id}
                actions={[
                    <span onClick={() => fetchComments(item.post_id)}><CommentOutlined /></span>
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar>{item.username?.[0]}</Avatar>}
                    title={item.title || 'No Title'}
                    description={item.Username || 'Anonymous'}
                />
                <div className='post-body'>{item.body}</div>
            </List.Item>
        );
    };

    return (
        <Layout>

            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1">All Posts</Menu.Item>
                        <Menu.Item key="2">My Posts</Menu.Item>
                        <Menu.Item key="3">Favorites</Menu.Item>
                    </Menu>
                </Sider>
                <Layout className='c-container'>
                    <Content
                        className="c-container"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div className='create-post'>
                            <h2 style={{ color: "#2774AE" }}>Create a New Post</h2>
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
                        </div>
                        <List
                            itemLayout="vertical"
                            size="large"
                            loading={loading}
                            dataSource={posts}
                            renderItem={renderItem}
                        />
                        <Modal
                            title="Comments"
                            visible={isModalVisible}
                            onCancel={() => setIsModalVisible(false)}
                            footer={null}
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={comments}
                                renderItem={comment => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar>{comment.username?.[0]}</Avatar>}
                                            title={comment.Username || 'Anonymous'}
                                            description={comment.body}
                                        />
                                    </List.Item>
                                )}
                            />
                            <Form layout="vertical">
                                <Form.Item label="Add a Comment">
                                    <TextArea
                                        value={commentBody}
                                        onChange={e => setCommentBody(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={handleCommentSubmit}>
                                        Comment
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Forum;
