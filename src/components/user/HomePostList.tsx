'use client';
import { Row, Typography, Col, Button, Space } from 'antd';
const { Title } = Typography;
import HighlightPost from './HighlightPost';
import Post from './Post';
import {list as listPosts} from '@/api/user/post';
import { useEffect, useState } from 'react';
import { useAppSelector } from "@/store/user/hooks"

export default function HomePostList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [ postHighlight, setPostHighlight] = useState<any>(null);
  const postCategories = useAppSelector((state) => state.app.postCategories)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await listPosts({limit: 12});
        const { data } = response;
        setPostHighlight(data[0] ?? null);
        setPosts(data.slice(1));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
      }
    };
    fetchPosts();
  }, []);
  
  return (
    <div style={{ backgroundColor: "#FFFFFF", paddingTop: 15, paddingBottom: 20, marginTop: 20 }}>
      <div className="container">
        <div className="container__inner">
          <Title level={4}>Bài viết nổi bật</Title>
          <Space style={{ marginBottom: 15 }} wrap>
            {postCategories.map((category: any) => (
              <Button 
                key={category.id}
                shape="round"
                href={`/danh-muc-bai-viet/${category.slug}`}
              >
                {category.name}
              </Button>
            ))}
          </Space>
          
          <Row gutter={[25, 25]}>
            <Col xs={24} sm={24} md={7}>
              <HighlightPost
                post={postHighlight}
              />
            </Col>
            <Col xs={24} sm={24} md={17}>
              <Row gutter={[25, 25]}>
                {posts.map((post, index) => (
                  <Col xs={24} sm={12} md={12} key={index}>
                    <Post
                      isShowCategory={true}
                      post={post}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
