import { Text, TextInput, View } from 'react-native';
import { Input } from 'react-native-elements';
import styles from './styles.module.scss';
import { useRef } from 'react';
import SelectFolderButton from '../FolderSelectButton/SelectFolderButton';
import { folderState } from '../../types';

interface Props {
  title?: string;
  strain?: string;
  breeder?: string;
  note?: string;
  onFolderSelect: (folder: folderState, index: number) => void;
  folder: string | null;
  onTextInputChange: (inputName: string, value: string) => void;
}

const GeneralForm = ({ title = '', strain = '', breeder = '', note = '', folder, onFolderSelect, onTextInputChange }: Props) => {
  const strainRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const breederRef = useRef<TextInput>(null);

  return (
    <View>
      <Input
        style={styles.input as any}
        onSubmitEditing={() => strainRef.current?.focus()}
        placeholder="title"
        blurOnSubmit={false}
        value={title}
        onChangeText={(text) => onTextInputChange('title', text)}
        label="Plant Title"
      />
      <Input
        ref={strainRef}
        onSubmitEditing={() => breederRef.current?.focus()}
        style={styles.input as any}
        value={strain}
        placeholder="strain"
        onChangeText={(text) => onTextInputChange('strain', text)}
        label="Strain"
      />
      <Input
        ref={breederRef}
        onSubmitEditing={() => noteRef.current?.focus()}
        style={styles.input as any}
        value={breeder}
        placeholder="breeder"
        onChangeText={(text) => onTextInputChange('breeder', text)}
        label="Breeder"
      />
      <Input ref={noteRef} style={styles.input as any} placeholder="note" value={note} onChangeText={(text) => onTextInputChange('note', text)} label="Note" />
      <Text style={styles.text}>Folder</Text>
      <SelectFolderButton onFolderSelect={onFolderSelect} selectedFolderPath={folder} />
    </View>
  );
};

export default GeneralForm;
