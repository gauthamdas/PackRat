import React from 'react';
import { VStack, Text, Image } from 'native-base';
import LargeCard from '../card/LargeCard';
import { Platform, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { isObjectEmpty } from '../../utils/isObjectEmpty';

const Hero = ({ children, imageDetails }) => {
  if (isObjectEmpty(imageDetails || {})) {
    imageDetails = {
      title: 'N/A',
      subtitle: 'N/A',
      source: require('../../assets/topographical-pattern.jpg'),
      alt: 'hero',
    };
  }

  const { title, subtitle, source, alt } = imageDetails;

  return (
    <View
      style={[
        styles.heroContainer,
        Platform.OS === 'web' ? { height: '310px' } : null,
      ]}
    >
      <Image source={source} alt={alt} style={styles.heroImage} />
      <VStack>{children}</VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    // overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
    position: 'absolute',
    // backgroundColor: theme.colors.primary,
  },
});

export default Hero;
