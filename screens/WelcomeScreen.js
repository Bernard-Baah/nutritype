import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const BLOOD_TYPE_TAGS = ['O+', 'A-', 'B+', 'AB', 'O-', 'A+', 'B-', 'AB+'];

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const tagAnims = useRef(BLOOD_TYPE_TAGS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Main content fade + slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Stagger blood type tags
    const tagAnimations = tagAnims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: 200 + i * 80,
        useNativeDriver: true,
      })
    );
    Animated.stagger(80, tagAnimations).start();

    // Pulse the accent dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background decorative circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Floating blood type tags */}
      <View style={styles.tagsContainer}>
        {BLOOD_TYPE_TAGS.map((tag, i) => (
          <Animated.View
            key={tag}
            style={[
              styles.bloodTag,
              {
                opacity: tagAnims[i],
                transform: [{ scale: tagAnims[i] }],
                left: (i % 4) * (width / 4) + 10,
                top: i < 4 ? 20 : 70,
              },
            ]}
          >
            <Text style={styles.bloodTagText}>{tag}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Logo / Icon */}
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.logoDot, { transform: [{ scale: pulseAnim }] }]} />
          <View style={styles.logoTextRow}>
            <Text style={styles.logoN}>N</Text>
            <Text style={styles.logoRest}>utri</Text>
            <Text style={styles.logoT}>T</Text>
            <Text style={styles.logoRest}>ype</Text>
          </View>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Nutrition Powered by{'\n'}Your Biology</Text>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerDot}>●</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Feature pills */}
        <View style={styles.featurePills}>
          {['🩸 Blood Type', '🎯 Personalized', '🥗 Science-Based'].map((f) => (
            <View key={f} style={styles.pill}>
              <Text style={styles.pillText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Get Started</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>

        <Text style={styles.subText}>
          Based on the "Eat Right 4 Your Type" framework
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    overflow: 'hidden',
  },
  bgCircle1: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: '#e94560',
    opacity: 0.05,
    top: -80,
    right: -80,
  },
  bgCircle2: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#e94560',
    opacity: 0.04,
    bottom: 60,
    left: -60,
  },
  tagsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    height: 130,
  },
  bloodTag: {
    position: 'absolute',
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#e9456030',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bloodTagText: {
    color: '#e9456070',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#e94560',
    marginBottom: 10,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 10,
  },
  logoTextRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoN: {
    fontSize: 52,
    fontWeight: '800',
    color: '#e94560',
    letterSpacing: -1,
  },
  logoT: {
    fontSize: 52,
    fontWeight: '800',
    color: '#e94560',
    letterSpacing: -1,
  },
  logoRest: {
    fontSize: 52,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 17,
    color: '#8888aa',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.3,
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '70%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2a2a3e',
  },
  dividerDot: {
    color: '#e94560',
    fontSize: 8,
    marginHorizontal: 10,
  },
  featurePills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 44,
  },
  pill: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#2a2a4e',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  pillText: {
    color: '#aaaacc',
    fontSize: 13,
    fontWeight: '500',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e94560',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 20,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 8,
  },
  ctaArrow: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '300',
  },
  subText: {
    color: '#44445a',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
