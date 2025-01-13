import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Video from 'react-native-video'

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Reel: undefined;
  // Add other screens as needed
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleLogout = async() => {
    await GoogleSignin.revokeAccess(); 
    await GoogleSignin.signOut();  
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Reel')} style={styles.reelView}>
        <Text style={styles.reelText}>Reels</Text>
        <Image source={require('../../assets/images/reel.png')} style={styles.reelIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
         
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Featured Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <Image
              source={{ uri: 'https://cdn.pixabay.com/photo/2024/05/09/08/07/ai-generated-8750167_640.jpg' }}
              style={[styles.featuredImage, { width: windowWidth - 40 }]}
            />
            <Text style={styles.imageCaption}>Featured Image Caption</Text>
          </View>

          {/* Gallery Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <View style={styles.gallery}>
              <View style={styles.galleryRow}>
                <Image
                  source={{ uri: 'https://cdn.pixabay.com/photo/2022/12/01/04/43/girl-7628308_640.jpg' }}
                  style={styles.galleryImage}
                />
                <Image
                  source={{ uri: 'https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_640.jpg' }}
                  style={styles.galleryImage}
                />
              </View>
              <View style={styles.galleryRow}>
                <Image
                  source={{ uri: 'https://cdn.pixabay.com/photo/2024/05/25/15/01/ai-generated-8787240_640.jpg' }}
                  style={styles.galleryImage}
                />
                <Image
                  source={{ uri: 'https://cdn.pixabay.com/photo/2023/01/06/12/28/ninja-7701126_640.jpg' }}
                  style={styles.galleryImage}
                />
              </View>
            </View>
          </View>

          {/* Content Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Latest Updates</Text>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://cdn.pixabay.com/photo/2022/12/01/04/40/backpacker-7628303_1280.jpg' }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Welcome to Our App</Text>
                <Text style={styles.cardText}>
                  This is a sample home page with embedded images and placeholder content. 
                  You can customize this section with your actual content and images.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View  style={styles.videoContainer}>
        <Video
            source={{ uri: "https://cdn.pixabay.com/video/2021/01/11/61695-499594106_large.mp4" }}
            style={styles.video}
            resizeMode="cover"
            repeat
            // muted={muteStatus[item.id]}
            playInBackground={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuredImage: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageCaption: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  gallery: {
    gap: 10,
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    width: Dimensions.get('window').width, // full width
    height: 500, // or whatever height you want
    backgroundColor: '#000', // adds a black background
  },
  reelIcon:{
      height:20,
      width:20,
      
  },
  reelView:{
    alignItems:'center',
      justifyContent:'center',
      flexDirection:"row",
      backgroundColor:'#00000020',
      padding:5,
      borderRadius:10

     
  },
  reelText:{
    marginRight:5,
    color: '#007AFF',
    fontSize: 16,
  }
});

export default HomeScreen;