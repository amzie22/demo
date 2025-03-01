import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ShopScreen = () => {
  const [orchivium, setOrchivium] = useState(0);
  const circles = Array(5).fill(null);
  const colors = ['#784C34', '#FF5733', '#33FF57', '#3357FF', '#FF33A1'];

  return (
    <ImageBackground 
      source={require('../assets/MainBG.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>SHOP</Text>
            <Text style={styles.orchiviumText}>{orchivium} Orchivium</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.boxContainer}>
            <View style={styles.box} />
          </View>
          <View style={styles.line} />
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.circleContainer}
          >
            {circles.map((_, index) => (
              <View key={index} style={[styles.circle, { backgroundColor: colors[index % colors.length] }]} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 20, 
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  orchiviumText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3D261C',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#3D261C',
    marginTop: 5,
    alignSelf: 'center',
  },
  boxContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15, 
  },
  box: {
    width: 300,
    height: 144,
    borderRadius: 16,
    backgroundColor: '#784C34',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export default ShopScreen;