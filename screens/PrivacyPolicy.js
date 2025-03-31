import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import { Colors } from "../constants/Colors";

const PrivacyPolicy = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.privacyPolicyContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.title}>1. Introduction</Text>
            <Text style={styles.sectionContent}>
              Expensense is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our software. Please read this Privacy
              Policy carefully to understand our views and practices regarding
              your information and how we will treat it.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.title}>2. Information We Collect</Text>
            <Text style={styles.bulletStyle}>
              <Text style={{ fontWeight: "bold" }}>Personal Information:</Text>{" "}
              Your full name, email address, phone number, or other identifiers
              provided during account creation or Software use.
            </Text>
            <Text style={styles.bulletStyle}>
              <Text style={{ fontWeight: "bold" }}>Usage Data:</Text>{" "}
              Information about how you interact with the Software, including
              device information, IP address, and analytics data.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.title}>3. How We Use Your Information</Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"} Provide and maintain the functionality of the Software.
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"} Personalize your experience and improve the Software.
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"} Communicate with you about updates, security, and
              support.
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"}Comply with legal obligations.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.title}>4. Your Rights</Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"} Access, update, or delete your personal data.
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"} Communicate with you about updates, security, and
              support.
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"} File a complaint with a data protection authority.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.title}>5. Data Security</Text>
            <Text>
              We take the protection of your personal information seriously and
              have implemented appropriate technical and organizational measures
              to safeguard it against unauthorized access, loss, misuse, or
              alteration. These measures include, but are not limited to:
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"}{" "}
              <Text style={{ fontWeight: "bold" }}> Access Controls:</Text>{" "}
              Access to your personal information is restricted to authorized
              personnel only, and such access is granted on a need-to-know
              basis.
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"}{" "}
              <Text style={{ fontWeight: "bold" }}> Regular Monitoring:</Text>{" "}
              Our systems are regularly monitored for vulnerabilities and
              security issues, and we implement updates as necessary to address
              emerging threats.
            </Text>
            <Text style={styles.bulletStyle}>
              {"\u2022"}
              <Text style={{ fontWeight: "bold" }}> Data Minimization:</Text> We
              collect and retain only the data necessary for the purposes
              outlined in this Privacy Policy.
            </Text>
            <Text>
              While we strive to protect your personal information, no system is
              completely secure. Unauthorized access, data breaches, or other
              security risks may still occur. You can help protect your
              information by safeguarding your account credentials and using
              secure networks when accessing our Software.
            </Text>
            <Text style={{ marginTop: 20 }}>
              If you suspect any unauthorized access to your data, please
              contact us immediately at jakemerlin01218@gmail.com.
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20, marginBottom: 50, marginLeft: 15 }}>
          <Text>
            <Text style={{ fontWeight: "bold", color: Colors.brown500 }}>
              Effective Date:
            </Text>{" "}
            January 5, 2025
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  privacyPolicyContainer: {
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: Colors.brown500,
    marginBottom: 7,
  },
  bulletStyle: {
    marginBottom: 3,
  },
});
