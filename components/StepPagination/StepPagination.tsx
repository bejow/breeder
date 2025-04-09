import { Pagination } from 'react-native-reanimated-carousel';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { SharedValue } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  step: SharedValue<number>;
  formSteps: {
    component: React.JSX.Element;
    step: number;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  }[];
  onPressPagination: (index: number) => void;
}

const StepPagination = ({ step, formSteps, onPressPagination }: Props) => {
  return (
    <Pagination.Custom<{ component: React.JSX.Element; step: number; icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] }>
      progress={step}
      data={formSteps}
      size={50}
      dotStyle={{
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeDotStyle={{
        borderRadius: 8,

        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
      }}
      containerStyle={{
        gap: 10,
        alignItems: 'center',
        height: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 16,
      }}
      horizontal
      onPress={onPressPagination}
      renderItem={(item, index) => <CustomIcon name={item.icon} size={30} onPress={() => onPressPagination(index)} />}
    />
  );
};

export default StepPagination;
