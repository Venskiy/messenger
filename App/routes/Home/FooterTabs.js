// @flow

import React from 'react';
import { Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';


type FooterTabsProps = {
  activeTab: string,
  onSelectTab: (tab: sting) => void,
}

const FooterTabs = ({ activeTab, onSelectTab }: FooterTabsProps) => (
  <Footer >
    <FooterTab>
      <Button onPress={() => onSelectTab('chats')} active={activeTab==='chats'}>
        <Icon name="ios-chatbubbles-outline" />
        <Text>Chats</Text>
      </Button>
      <Button onPress={() => onSelectTab('users')} active={activeTab==='users'}>
        <Icon name="person" />
        <Text>Users</Text>
      </Button>
    </FooterTab>
  </Footer>
);

export default FooterTabs;
