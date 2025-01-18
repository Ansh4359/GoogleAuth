import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
// import Icon from 'react-native-vector-icons';


type RootStackParamList = {
  Home: undefined;
  VideoFeed: undefined;
};

type VideoFeedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VideoFeed'>;
};

const VideoFeedScreen: React.FC<VideoFeedScreenProps> = ({ navigation }) => {
  const [videos] = useState([
    {
      id: '1',
      username: 'user_one',
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
      videoUrl: 'https://videos.pexels.com/video-files/10484596/10484596-sd_506_960_25fps.mp4',
      likes: 1234,
      caption: 'Beautiful sunset! 🌅',
      comments: 89,
    },
    {
      id: '2',
      username: 'user_two',
      profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
      videoUrl: 'https://dl.dropboxusercontent.com/scl/fi/uwsohsiwu96t1do58t38q/amritudyan.mp4?rlkey=02ht85oftowdmplx1266bkhkp&st=czoy6i6q&dl=0',
      likes: 856,
      caption: 'Amazing view 🎉',
      comments: 45,
    },
    {
      id: '3',
      username: 'user_three',
      profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
      videoUrl: 'https://cdn.pixabay.com/video/2024/01/20/11695-170248712_large.mp4',
      likes: 2341,
      caption: 'Nature is beautiful 🌿',
      comments: 156,
    },
  ]);

  const [muteStatus, setMuteStatus] = useState<Record<string, boolean>>({});

  const toggleMute = (videoId: string) => {
    setMuteStatus(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const renderVideo = ({ item }) => (
    <View style={styles.videoContainer}>
      {/* User Info Header */}
      <View style={styles.videoHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.profilePic }}
            style={styles.profilePic}
          />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Video Player */}
      <View style={styles.videoWrapper}>
        <Video
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          repeat
        
          muted={muteStatus[item.id]}
          playInBackground={false}
          controls={false}
        />
        
        {/* Video Controls */}
        <TouchableOpacity 
          style={styles.muteButton}
          onPress={() => toggleMute(item.id)}
        >
          <Icon 
            name={muteStatus[item.id] ? "volume-off" : "volume-up"} 
            size={24} 
            color="#FFF" 
          />
        </TouchableOpacity>

        {/* Right Side Actions */}
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="favorite-border" size={32} color="#FFF" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chat-bubble-outline" size={32} color="#FFF" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="send" size={32} color="#FFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="bookmark-border" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Caption */}
        <View style={styles.captionContainer}>
          <Text style={styles.captionText}>
            <Text style={styles.captionUsername}>{item.username}</Text>
            {' '}{item.caption}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          {/* <ChevronLeft size={32} color="#FFF" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reels</Text>
      </View>

      {/* Videos List */}
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 49} // Adjust for header
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  videoContainer: {
    height: Dimensions.get('window').height - 49,
    position: 'relative',
  },
  videoHeader: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    zIndex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  username: {
    color: '#FFF',
    fontWeight: '600',
  },
  videoWrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  muteButton: {
    position: 'absolute',
    bottom: 120,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  rightActions: {
    position: 'absolute',
    right: 15,
    bottom: 150,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    color: '#FFF',
    marginTop: 5,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 60,
  },
  captionText: {
    color: '#FFF',
    fontSize: 14,
  },
  captionUsername: {
    fontWeight: 'bold',
  },
});

export default VideoFeedScreen;