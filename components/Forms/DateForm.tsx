import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button, View } from 'react-native';
import IconButton from '../IconButton/IconButton';
import styles from './styles.module.scss'

interface Props {
  startDate?: Date;
  flowerDate?: Date;
  harvestDate?: Date;
  onStartDateChange: (event: DateTimePickerEvent, date: Date | undefined) => void;
  onFlowerDateChange: (event: DateTimePickerEvent, date: Date | undefined) => void;
  onHarvestDateChange: (event: DateTimePickerEvent, date: Date | undefined) => void;
  displayDatepicker: {
    startDate: boolean;
    flowerDate: boolean;
    harvestDate: boolean;
  };
  setDisplayDatepicker: (
    value: React.SetStateAction<{
      startDate: boolean;
      flowerDate: boolean;
      harvestDate: boolean;
    }>
  ) => void;
}

const DateForm = ({
  setDisplayDatepicker,
  displayDatepicker,
  onStartDateChange,
  onFlowerDateChange,
  onHarvestDateChange,
  startDate = new Date(),
  flowerDate = new Date(),
  harvestDate = new Date(),
}: Props) => (
  <View>

      <IconButton style={styles.dateButton} icon="seed-outline"  title={`Start - ${startDate.toDateString()}`} onPress={() => setDisplayDatepicker({ ...displayDatepicker, startDate: true })} />
      <IconButton style={styles.dateButton}  icon="flower-outline" title={`Flower - ${flowerDate.toDateString()}`} onPress={() => setDisplayDatepicker({ ...displayDatepicker, flowerDate: true })} />
      <IconButton style={styles.dateButton}  icon="fruit-grapes-outline"  title={`Harvest - ${harvestDate.toDateString()}`} onPress={() => setDisplayDatepicker({ ...displayDatepicker, harvestDate: true })} />
    {displayDatepicker.startDate && <DateTimePicker value={startDate ? startDate : new Date()} onChange={onStartDateChange} mode="date" />}
    {displayDatepicker.harvestDate && <DateTimePicker value={harvestDate ? harvestDate : new Date()} onChange={onHarvestDateChange} mode="date" />}
    {displayDatepicker.flowerDate && <DateTimePicker value={flowerDate ? flowerDate : new Date()} onChange={onFlowerDateChange} mode="date" />}
  </View>
);

export default DateForm;
