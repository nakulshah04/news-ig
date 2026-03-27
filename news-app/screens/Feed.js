import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import PostCard from '../components/PostCard';

const { height } = Dimensions.get('window');

const categories = [
  { label: 'Top', value: 'general' },
  { label: 'Tech', value: 'technology' },
  { label: 'Sports', value: 'sports' },
  { label: 'Business', value: 'business' },
  { label: 'World', value: 'world' }
];

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const flatListRef = useRef(null);
  const API_KEY = "YOUR_API_KEY";

  const fetchNews = async (category) => {
    try {
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=20&apikey=172eac4ff808ca04273131746aed45b0`
      );

      const data = await res.json();

      const formatted = (data.articles || [])
        .filter(a => a.image && a.description)
        .map((article, index) => ({
          id: index.toString(),
          title: article.title,
          description: article.description,
          imageUrl: article.image,
          url: article.url
        }));

      setPosts(formatted);

      // scroll back to top when category changes
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchNews(selectedCategory);
      setLoading(false);
    };
    load();
  }, [selectedCategory]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      
      {/* 🔥 Category Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 10, backgroundColor: 'black' }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.value}
            onPress={() => setSelectedCategory(cat.value)}
            style={{
              marginHorizontal: 10,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor:
                selectedCategory === cat.value ? 'white' : '#222'
            }}
          >
            <Text
              style={{
                color:
                  selectedCategory === cat.value ? 'black' : 'white',
                fontWeight: '600'
              }}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🔥 Reels Feed */}
      <FlatList
        ref={flatListRef}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ height }}>
            <PostCard post={item} />
          </View>
        )}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}