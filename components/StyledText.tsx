

import React from 'react';
import { Text as DefaultText, StyleSheet, TextProps } from 'react-native';

type CustomTextProps = TextProps & {
  bold?: boolean;
  italic?: boolean;
};

export function StyledText({ style, bold, italic, ...rest }: CustomTextProps) {
  const getFontFamily = () => {
    if (bold) return styles.bold;
    if (italic) return styles.italic;
    return styles.regular;
  };

  return (
    <DefaultText
      style={[
        getFontFamily(), 
        style,          
      ]}
      {...rest} 
    />
  );
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Inter-Regular',
    color: '#ffffff', 
  },
  bold: {
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  italic: {
    fontFamily: 'Inter-Italic',
    color: '#ffffff',
  },
});