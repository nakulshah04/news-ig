import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';

export default function PostCard({ post }) {
  return (
    <View style={{ margin: 10 }}>
      <Image source={{ uri: post.imageUrl }} style={{ height: 200, borderRadius: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{post.title}</Text>
      <Text numberOfLines={3}>{post.description}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(post.url)}>
        <Text style={{ color: 'blue' }}>Read more...</Text>
      </TouchableOpacity>
    </View>
  );
}