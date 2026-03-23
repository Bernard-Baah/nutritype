import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS = ['Male', 'Female', 'Other'];
const GOALS = ['Belly Fat Loss', 'Muscle Gain', 'Sustained Energy', 'General Health', 'Weight Loss'];
const ACTIVITY_LEVELS = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'];

function SectionLabel({ icon, label }) {
  return (
    <View style={styles.sectionLabel}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionText}>{label}</Text>
    </View>
  );
}

function SelectGrid({ options, selected, onSelect, fullWidth }) {
  return (
    <View style={[styles.grid, fullWidth && styles.gridColumn]}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.selectBtn,
            fullWidth && styles.selectBtnFull,
            selected === opt && styles.selectBtnActive,
          ]}
          onPress={() => onSelect(opt)}
          activeOpacity={0.75}>
          <Text style={[styles.selectBtnText, selected === opt && styles.selectBtnTextActive]}>
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const [bloodType, setBloodType] = useState('O+');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [goal, setGoal] = useState('General Health');
  const [activityLevel, setActivityLevel] = useState('Moderately Active');
  const [weeklyWorkouts, setWeeklyWorkouts] = useState('3');
  const [error, setError] = useState('');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleSubmit = () => {
    const ageNum = parseInt(age, 10);
    const workoutsNum = parseInt(weeklyWorkouts, 10);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Please enter a valid age (1–120).');
      shake();
      return;
    }
    setError('');
    navigation.navigate('Results', {
      profile: { bloodType, age: ageNum, gender, goal, activityLevel, weeklyWorkouts: workoutsNum },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Your Profile</Text>
          <Text style={styles.headerSub}>Personalise your plan</Text>
        </View>
        <View style={styles.stepBadge}>
          <Text style={styles.stepText}>1 / 2</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* Blood Type */}
        <View style={styles.card}>
          <SectionLabel icon="🩸" label="Blood Type" />
          <View style={styles.grid}>
            {BLOOD_TYPES.map((bt) => (
              <TouchableOpacity
                key={bt}
                style={[styles.selectBtn, styles.selectBtnBlood, bloodType === bt && styles.selectBtnActive]}
                onPress={() => setBloodType(bt)}
                activeOpacity={0.75}>
                <Text style={[styles.selectBtnText, bloodType === bt && styles.selectBtnTextActive]}>{bt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Age */}
        <View style={styles.card}>
          <SectionLabel icon="🎂" label="Age" />
          <TextInput
            style={styles.textInput}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            placeholderTextColor="#44445a"
            keyboardType="numeric"
            maxLength={3}
            returnKeyType="done"
          />
        </View>

        {/* Gender */}
        <View style={styles.card}>
          <SectionLabel icon="⚧️" label="Gender" />
          <SelectGrid options={GENDERS} selected={gender} onSelect={setGender} />
        </View>

        {/* Primary Goal */}
        <View style={styles.card}>
          <SectionLabel icon="🎯" label="Primary Goal" />
          <SelectGrid options={GOALS} selected={goal} onSelect={setGoal} fullWidth />
        </View>

        {/* Activity Level */}
        <View style={styles.card}>
          <SectionLabel icon="⚡" label="Activity Level" />
          <SelectGrid options={ACTIVITY_LEVELS} selected={activityLevel} onSelect={setActivityLevel} fullWidth />
        </View>

        {/* Weekly Workouts */}
        <View style={styles.card}>
          <SectionLabel icon="🏋️" label="Weekly Workouts" />
          <View style={styles.workoutRow}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <TouchableOpacity
                key={n}
                style={[styles.workoutBtn, parseInt(weeklyWorkouts) === n && styles.selectBtnActive]}
                onPress={() => setWeeklyWorkouts(String(n))}>
                <Text style={[styles.workoutBtnText, parseInt(weeklyWorkouts) === n && styles.selectBtnTextActive]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {error ? (
          <Animated.View style={[styles.errorBox, { transform: [{ translateX: shakeAnim }] }]}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </Animated.View>
        ) : null}

        <TouchableOpacity style={styles.generateBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.generateText}>Generate My Plan</Text>
          <Text style={styles.generateIcon}>🧬</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#1a1a2e',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { color: '#e94560', fontSize: 20, fontWeight: '300' },
  headerTitle: { color: '#ffffff', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  headerSub: { color: '#555577', fontSize: 12, textAlign: 'center', marginTop: 2 },
  stepBadge: { backgroundColor: '#1a1a2e', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  stepText: { color: '#e94560', fontSize: 12, fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 16 },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16, padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  sectionLabel: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionIcon: { fontSize: 18, marginRight: 8 },
  sectionText: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gridColumn: { flexDirection: 'column', gap: 8 },
  selectBtn: {
    paddingHorizontal: 16, paddingVertical: 12,
    borderRadius: 10, backgroundColor: '#0d0d1f',
    borderWidth: 1.5, borderColor: '#2a2a4e',
    alignItems: 'center', justifyContent: 'center',
  },
  selectBtnBlood: { width: 60, height: 48 },
  selectBtnFull: { width: '100%' },
  selectBtnActive: {
    backgroundColor: '#e94560',
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  selectBtnText: { color: '#8888aa', fontSize: 15, fontWeight: '600' },
  selectBtnTextActive: { color: '#ffffff', fontWeight: '700' },
  textInput: {
    backgroundColor: '#0d0d1f',
    borderRadius: 10, borderWidth: 1.5, borderColor: '#2a2a4e',
    color: '#ffffff', fontSize: 16,
    paddingHorizontal: 14, paddingVertical: 14,
  },
  workoutRow: { flexDirection: 'row', justifyContent: 'space-between' },
  workoutBtn: {
    flex: 1, marginHorizontal: 2, height: 44,
    borderRadius: 8, backgroundColor: '#0d0d1f',
    borderWidth: 1.5, borderColor: '#2a2a4e',
    alignItems: 'center', justifyContent: 'center',
  },
  workoutBtnText: { color: '#8888aa', fontSize: 15, fontWeight: '700' },
  errorBox: {
    backgroundColor: '#2a0a0f', borderWidth: 1,
    borderColor: '#e9456060', borderRadius: 10,
    padding: 12, marginBottom: 14,
  },
  errorText: { color: '#e94560', fontSize: 13, fontWeight: '500' },
  generateBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#e94560', borderRadius: 14, paddingVertical: 17, marginTop: 4,
    shadowColor: '#e94560', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 16, elevation: 12,
  },
  generateText: { color: '#ffffff', fontSize: 18, fontWeight: '700', letterSpacing: 0.4, marginRight: 8 },
  generateIcon: { fontSize: 20 },
});
