/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { TextProps as RNTextProps, TextInput } from 'react-native';
import Animated, {
  AnimatedProps,
  SharedValue,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';

interface TextProps {
  text: string;
  value: SharedValue<number | boolean> | number | boolean;
  style?: AnimatedProps<RNTextProps>['style'];
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const ReText = (props: TextProps) => {
  const { text, value: _providedValue, style } = { style: {}, ...props };
  const providedValue = useDerivedValue(() =>
    typeof _providedValue === 'number' || typeof _providedValue === 'boolean'
      ? _providedValue
      : typeof _providedValue.value === 'number'
        ? _providedValue.value.toFixed(2)
        : _providedValue.value,
  );
  const animatedProps = useAnimatedProps(() => {
    return {
      text: `${text}: ${providedValue.value}`,
    };
  }, [providedValue]);
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={`${text}: ${providedValue.value}`}
      style={style}
      // @ts-ignore
      animatedProps={animatedProps}
    />
  );
};
