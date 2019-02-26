import moment from 'moment';
import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { secondsToDigitalClockFormat } from '../../redux/util/common';

type Props = {
  deadline: Date | string,
};

type State = {
  text: string,
};

const getText = (date: Date | string) => {
  const now = moment();
  const then = moment(date);
  const getString = () =>
    secondsToDigitalClockFormat(Math.abs(now.diff(then, 'seconds')));

  // const getString = () => {
  //   const hoursBetween = Math.abs(now.diff(then, 'hours'));

  //   if (hoursBetween > 24) {
  //     const daysBetween = Math.abs(now.diff(then, 'days'));

  //     if (daysBetween > 1) {
  //       return `${daysBetween} Days`;
  //     }

  //     return `${daysBetween} Day`;
  //   }

  //   return formatSeconds(Math.abs(now.diff(then, 'seconds')));
  // };

  if (then.isAfter(now)) {
    return getString();
  }

  return `-${getString()}`;
};

class CountDown extends PureComponent<Props, State> {
  state = {
    text: '00:00:00',
  };

  componentDidMount() {
    const { deadline } = this.props;

    this.timer = setInterval(() => {
      this.setState({
        text: getText(deadline),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer: any;

  render() {
    const { text } = this.state;

    return <Text {...this.props}>{text}</Text>;
  }
}

export default CountDown;
