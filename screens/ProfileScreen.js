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
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS = ['Male', 'Female', 'Other'];
const GOALS = [
  'Belly Fat Loss',
  'Muscle Gain',
  'Sustained Energy',
  'General Health',
  'Weight Loss',
];
const ACTIVITY_LEVELS = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
];

function SectionLabel({ icon, label }) {
  return (
    <View style={styles.sectionLabel}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionText}>{label}</Text>
    </View>
  );
}

function PickerCard({ value, onChange, options }) {
  return (
    <View style={styles.pickerCard}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
        dropdownIconColor="#e94560"
        itemStyle={styles.pickerItem}
      >
        {options.map((opt) => (
          <Picker.Item key={opt} label={opt} value={opt} color={Platform.OS === 'ios' ? '#ffffff' : '#ccccee'} />
        ))}
      </Picker>
    </View>
  );
}

function BloodTypeGrid({ selected, onSelect }) {
  return (
    <View style={styles.bloodTypeGrid}>
      {BLOOD_TYPES.map((bt) => (
        <TouchableOpacity
          key={bt}
          style={[styles.bloodTypeBtn, selected === bt && styles.bloodTypeBtnActive]}
          onPress={() => onSelect(bt)}
          activeOpacity={0.75}
        >
          <Text style={[styles.bloodTypeBtnText, selected === bt && styles.bloodTypeBtnTextActive]}>
            {bt}
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
    if (isNaN(workoutsNum) || workoutsNum < 0 || workoutsNum > 7) {
      setError('Weekly workouts must be between 0 and 7.');
      shake();
      return;
    }

    setError('');
    navigation.navigate('Results', {
      profile: {
        bloodType,
        age: ageNum,
        gender,
        goal,
        activityLevel,
        weeklyWorkouts: workoutsNum,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
        keyboardShouldPersistTaps="handled"
      >
        {/* Blood Type */}
        <View style={styles.card}>
          <SectionLabel icon="🩸" label="Blood Type" />
          <BloodTypeGrid selected={bloodType} onSelect={setBloodType} />
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
          <PickerCard value={gender} onChange={setGender} options={GENDERS} />
        </View>

        {/* Primary Goal */}
        <View style={styles.card}>
          <SectionLabel icon="🎯" label="Primary Goal" />
          <PickerCard value={goal} onChange={setGoal} options={GOALS} />
        </View>

        {/* Activity Level */}
        <View style={styles.card}>
          <SectionLabel icon="⚡" label="Activity Level" />
          <PickerCard value={activityLevel} onChange={setActivityLevel} options={ACTIVITY_LEVELS} />
        </View>

        {/* Weekly Workouts */}
        <View style={styles.card}>
          <SectionLabel icon="🏋️" label="Weekly Workouts" />
          <View style={styles.workoutRow}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.workoutBtn,
                  parseInt(weeklyWorkouts) === n && styles.workoutBtnActive,
                ]}
                onPress={() => setWeeklyWorkouts(String(n))}
              >
                <Text
                  style={[
                    styles.workoutBtnText,
                    parseInt(weeklyWorkouts) === n && styles.workoutBtnTextActive,
                  ]}
                >
                  {n}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Error */}
        {error ? (
          <Animated.View style={[styles.errorBox, { transform: [{ translateX: shakeAnim }] }]}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </Animated.View>
        ) : null}

        {/* Submit */}
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.generateText}>Generate My Plan</Text>
          <Text style={styles.generateIcon}>🧬</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a2e',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#e94560',
    fontSize: 20,
    fontWeight: '300',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSub: {
    color: '#555577',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  stepBadge: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  stepText: {
    color: '#e94560',
    fontSize: 12,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionText: {
    color: '#ccccee',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  bloodTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bloodTypeBtn: {
    width: 60,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#0a0a1a',
    borderWidth: 1,
    borderColor: '#2a2a4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodTypeBtnActive: {
    backgroundColor: '#e94560',
    borderColor: '#e94560',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  bloodTypeBtnText: {
    color: '#555577',
    fontSize: 15,
    fontWeight: '600',
  },
  bloodTypeBtnTextActive: {
    color: '#ffffff',
  },
  pickerCard: {
    backgroundColor: '#0a0a1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a4e',
    overflow: 'hidden',
  },
  picker: {
    color: '#ccccee',
    height: 50,
  },
  pickerItem: {
    color: '#ccccee',
    backgroundColor: '#1a1a2e',
    fontSize: 15,
  },
  textInput: {
    backgroundColor: '#0a0a1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a4e',
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutBtn: {
    flex: 1,
    marginHorizontal: 2,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#0a0a1a',
    borderWidth: 1,
    borderColor: '#2a2a4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutBtnActive: {
    backgroundColor: '#e94560',
    borderColor: '#e94560',
  },
  workoutBtnText: {
    color: '#555577',
    fontSize: 14,
    fontWeight: '600',
  },
  workoutBtnTextActive: {
    color: '#ffffff',
  },
  errorBox: {
    backgroundColor: '#2a0a0f',
    borderWidth: 1,
    borderColor: '#e9456060',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  errorText: {
    color: '#e94560',
    fontSize: 13,
    fontWeight: '500',
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e94560',
    borderRadius: 14,
    paddingVertical: 17,
    marginTop: 4,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  generateText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginRight: 8,
  },
  generateIcon: {
    fontSize: 20,
  },
});
