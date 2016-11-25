'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  ScrollView,
  StyleSheet,
  SwitchIOS,
  Text,
  View
} from 'react-native';
import {
  Cell,
  CustomCell,
  Section,
  TableView
} from 'react-native-tableview-simple';

class FeaturesList extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={tableViewStyles.stage}>
        <TableView>
          <Section header="STANDARD" footer="A Footer">
            <Cell cellStyle="Basic" title="Basic"/>
            <Cell cellStyle="RightDetail" title="RightDetail" detail="Detail" />
            <Cell cellStyle="LeftDetail" title="LeftDetail" detail="Detail"/>
            <Cell cellStyle="Subtitle" title="Subtitle" detail="No linebreakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"/>
            <Cell cellStyle="Basic" title="Pressable w/ accessory" accessory="DisclosureIndicator" onPress={() => console.log('Heyho!')}/>
          </Section>
          <Section header="DISABLED">
            <Cell cellStyle="Basic" isDisabled={true} title="Basic"/>
            <Cell cellStyle="RightDetail" isDisabled={true} title="RightDetail" detail="Detail" />
            <Cell cellStyle="LeftDetail" isDisabled={true} title="LeftDetail" detail="Detail"/>
            <Cell cellStyle="Subtitle" isDisabled={true} title="Subtitle" detail="No linebreakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"/>
            <Cell cellStyle="Basic" isDisabled={true} title="Pressable w/ accessory" accessory="DisclosureIndicator" onPress={() => {console.log('Heyho!')}}/>
          </Section>
          <Section header="ACCESSORY">
            <Cell cellStyle="Basic" accessory="DisclosureIndicator" title="Basic"/>
            <Cell cellStyle="RightDetail" accessory="DetailDisclosure" title="RightDetail" detail="Detail" />
            <Cell cellStyle="LeftDetail" accessory="Detail" title="LeftDetail" detail="Detail"/>
            <Cell cellStyle="Subtitle" accessory="Checkmark" title="Subtitle" detail="No linebreakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"/>
            <Cell cellStyle="Basic" accessory="Detail" title="Pressable w/ accessory" onPress={() => console.log('Heyho!')}/>
          </Section>
          <Section header="CUSTOMCELLS">
            <CustomCell>
              <Text style={{flex: 1, fontSize: 16}}>Loading</Text>
              <ActivityIndicator/>
            </CustomCell>
            <CustomCell>
              <Text style={{flex: 1, fontSize: 16}}>Switch</Text>
              <SwitchIOS/>
            </CustomCell>
            <CustomCell contentContainerStyle={{ height: 60 }}>
              <Text style={{ flex: 1, fontSize: 16 }}>Custom height</Text>
            </CustomCell>
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

const tableViewStyles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 20,
    paddingBottom: 20,
    width: 320,
  },
});

module.exports = FeaturesList;
