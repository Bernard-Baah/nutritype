import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';
import { getMockNutritionPlan } from '../services/nutritionService';

export default function ResultsScreen({ route, navigation }) {
  const { profile } = route.params;
  const plan = getMockNutritionPlan(profile);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.bloodTypeBadge}>
          <Text style={styles.bloodTypeText}>{profile.bloodType}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* Title */}
          <Text style={styles.title}>Your NutriType Plan</Text>
          <Text style={styles.subtitle}>
            Personalized for blood type {profile.bloodType} · {profile.goal}
          </Text>

          {/* Foundation Foods */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🥗</Text>
              <Text style={styles.cardTitle}>Foundation Foods</Text>
            </View>
            <Text style={styles.cardDesc}>10 highly beneficial foods for your blood type</Text>
            <View style={styles.foodGrid}>
              {plan.foundationFoods.map((food, i) => (
                <View key={i} style={styles.foodChip}>
                  <Text style={styles.foodChipText}>{food}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Avoid List */}
          <View style={[styles.card, styles.cardRed]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>⚠️</Text>
              <Text style={styles.cardTitle}>Foods to Avoid</Text>
            </View>
            <Text style={styles.cardDesc}>Common "healthy" foods your blood type may struggle with</Text>
            {plan.avoidFoods.map((food, i) => (
              <View key={i} style={styles.avoidRow}>
                <Text style={styles.avoidX}>✕</Text>
                <Text style={styles.avoidText}>{food}</Text>
              </View>
            ))}
          </View>

          {/* Metabolic Timing */}
          <View style={[styles.card, styles.cardBlue]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>⚡</Text>
              <Text style={styles.cardTitle}>Metabolic Timing</Text>
            </View>
            <Text style={styles.cardDesc}>Pre & post workout nutrition strategy</Text>
            <Text style={styles.timingText}>{plan.metabolicTiming}</Text>
          </View>

          {/* Sample Day Menu */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>🍽️</Text>
              <Text style={styles.cardTitle}>Sample Day Menu</Text>
            </View>
            <Text style={styles.cardDesc}>A full day of eating tailored to your profile</Text>
            {[
              { meal: '🌅 Breakfast', content: plan.sampleMenu.breakfast },
              { meal: '☀️ Lunch', content: plan.sampleMenu.lunch },
              { meal: '🌙 Dinner', content: plan.sampleMenu.dinner },
            ].map(({ meal, content }, i) => (
              <View key={i} style={styles.mealRow}>
                <Text style={styles.mealLabel}>{meal}</Text>
                <Text style={styles.mealContent}>{content}</Text>
              </View>
            ))}
          </View>

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            ⚕️ This plan is for informational purposes only. Consult a healthcare professional before making significant dietary changes.
          </Text>

          {/* Regenerate */}
          <TouchableOpacity
            style={styles.regenBtn}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.85}>
            <Text style={styles.regenText}>Update My Profile</Text>
          </TouchableOpacity>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 8,
  },
  backText: {
    color: '#e94560',
    fontSize: 16,
    fontWeight: '600',
  },
  bloodTypeBadge: {
    backgroundColor: '#e94560',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  bloodTypeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666688',
    marginBottom: 24,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  cardRed: {
    borderColor: '#e9456030',
  },
  cardBlue: {
    borderColor: '#0f346030',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  cardDesc: {
    fontSize: 13,
    color: '#666688',
    marginBottom: 16,
    lineHeight: 18,
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  foodChip: {
    backgroundColor: '#0f3460',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  foodChipText: {
    color: '#aaccff',
    fontSize: 13,
    fontWeight: '500',
  },
  avoidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avoidX: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 10,
    width: 16,
  },
  avoidText: {
    color: '#ccaabb',
    fontSize: 15,
  },
  timingText: {
    color: '#aaaacc',
    fontSize: 15,
    lineHeight: 24,
  },
  mealRow: {
    marginBottom: 16,
  },
  mealLabel: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  mealContent: {
    color: '#ccccee',
    fontSize: 15,
    lineHeight: 22,
  },
  disclaimer: {
    color: '#44445a',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  regenBtn: {
    borderWidth: 1,
    borderColor: '#e94560',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  regenText: {
    color: '#e94560',
    fontSize: 16,
    fontWeight: '700',
  },
});
