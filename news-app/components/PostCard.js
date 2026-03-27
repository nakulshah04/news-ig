import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as Linking from 'expo-linking';

const { height } = Dimensions.get('window');

export default function PostCard({ post }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Background Image */}
      <Image
        source={{ uri: post.imageUrl }}
        style={{
          position: 'absolute',
          height: height,
          width: '100%'
        }}
        resizeMode="cover"
      />

      {/* Dark overlay */}
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        padding: 20
      }}>
        {/* Title */}
        <Text style={{
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold'
        }}>
          {post.title}
        </Text>

        {/* Description */}
        <Text style={{
          color: '#ddd',
          marginTop: 10,
          fontSize: 16
        }}>
          {post.description}
        </Text>

        {/* CTA */}
        <TouchableOpacity onPress={() => Linking.openURL(post.url)}>
          <Text style={{
            marginTop: 12,
            color: '#4da6ff',
            fontSize: 16,
            fontWeight: '600'
          }}>
            Read more →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}