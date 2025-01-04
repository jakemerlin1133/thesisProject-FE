import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const TermsAndConditions = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.termsAndConditionContainer}>
          <View style={styles.introductionContainer}>
            <Text>Introduction</Text>
            <Text>
              This End User License Agreement is a legal agreement between you
              and Expensense for the use of the Expensense application,
              including any associated media, documentation, updates, and
              support services . By installing or using the Software, you agree
              to be bound by the terms of this Agreement. If you do not agree
              with these terms, please do not use the application.
            </Text>
          </View>

          <View>
            <Text>Grant of License</Text>
            <Text>
              The Licensor grants you a limited, non-exclusive,
              non-transferable, and revocable license to use the Software solely
              for personal or internal business purposes.
            </Text>
            <Text>
              You may not sublicense, sell, or distribute the Software to any
              third party without prior written consent from the Licensor.
            </Text>
          </View>

          <View>
            <Text>Restrictions on Use</Text>
            <Text>
              Copy, modify, or create derivative works of the Software.
            </Text>
            <Text>
              Reverse-engineer, decompile, or disassemble the Software.
            </Text>
            <Text>
              Use the Software for unlawful purposes or in violation of any
              applicable laws or regulations.
            </Text>
            <Text>Rent, lease, lend, or resell the Software.</Text>
            <Text>
              Circumvent or disable any security features of the Software.
            </Text>
          </View>

          <View>
            <Text>Ownership</Text>
            <Text>
              The Software is licensed, not sold. The Licensor retains all
              rights, title, and interest in and to the Software, including but
              not limited to intellectual property rights.
            </Text>
            <Text>
              This Agreement does not grant you any ownership rights to the
              Software or its content.
            </Text>
          </View>

          <View>
            <Text>Updates and Maintenance</Text>
            <Text>
              The Licensor may provide updates or patches to improve or modify
              the Software. These updates are governed by the terms of this
              Agreement unless accompanied by a separate agreement.
            </Text>
            <Text>
              he Licensor is under no obligation to provide support or
              maintenance services for the Software.
            </Text>
          </View>

          <View>
            <Text>Data Collection and Privacy</Text>
            <Text>
              The Software may collect data as described in the Licensor's
            </Text>
            <TouchableOpacity>
              <Text>Privacy Policy.</Text>
            </TouchableOpacity>
            <Text>
              By using the Software, you consent to such data collection and
              processing.
            </Text>

            <Text>
              You are responsible for ensuring that your use of the Software
              complies with all applicable data protection laws.
            </Text>
          </View>

          <View>
            <Text>Limitation of Liability</Text>
            <Text>
              The Software is provided "as is" without any warranties, express
              or implied, including but not limited to implied warranties of
              merchantability or fitness for a particular purpose.
            </Text>
            <Text>
              The Licensor shall not be liable for any damages arising from the
              use or inability to use the Software, including but not limited to
              direct, indirect, incidental, or consequential damages.
            </Text>
          </View>

          <View>
            <Text>Termination</Text>
            <Text>
              This Agreement is effective until terminated. The Licensor may
              terminate this Agreement immediately if you fail to comply with
              its terms.
            </Text>
            <Text>
              Upon termination, you must cease all use of the Software and
              delete all copies in your possession.
            </Text>
          </View>

          <View>
            <Text>Governing Law</Text>
            <Text>
              This Agreement shall be governed by the laws of Philippines. Any
              disputes arising under or in connection with this Agreement shall
              be subject to the exclusive jurisdiction of the courts located in
              Philippines.
            </Text>
            <View>
              <Text>Civil Code of the Philippines (Republic Act No. 386)</Text>
              <Text> Data Privacy Act of 2012 (Republic Act No. 10173)</Text>
              <Text> E-Commerce Act of 2000 (Republic Act No. 8792)</Text>
            </View>
          </View>

          <View>
            <Text>Entire Agreement</Text>
            <Text>
              This Agreement constitutes the entire agreement between you and
              the Licensor regarding the Software and supersedes all prior
              agreements and understandings.
            </Text>
          </View>

          <View>
            <Text>Contact Information</Text>
            <Text>
              If you have any questions or concerns about this Agreement, please
              contact us at jakemerlin010218@gmail.com .
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  termsAndConditionContainer: {
    padding: 10,
  },
  introductionContainer: {},
});
