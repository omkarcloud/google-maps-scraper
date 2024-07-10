import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from '@elastic/eui'
import { useState } from 'react'
import ClickOutside from '../ClickOutside/ClickOutside'
import TextAreaField from './TextAreaField'

function isEmpty(x: any) {
  return (
    x === null || x === undefined || (typeof x == "string" && x.trim() === "")
  )
}

function findLink(inputString) {
  const regex = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/;
  const match = inputString.match(regex);
  return match ? match[0] : null;
}
function getLink(string) {
  let url

  try {
    url = new URL(string)
    if (url.protocol === "http:" || url.protocol === "https:"){
      return string
    }
    return findLink(string)
  } catch (_) {
    return findLink(string)
  }  
}



function isNotEmpty(x: any) {
  return !isEmpty(x)
}

function isBulkEdit(value, islinks) {
  if (islinks) {
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if (getLink(element)){
        return true
      }
    }
  }else {
    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      if (isNotEmpty(element)){
        return true
      }
    }
  }
  return false

}

const ListOfTextFields = ({ id,islinks, value, onChange, placeholder , disabled, title}) => {
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }
  
  const openModal = () => {
    setShowModal(true)
  }
  const handleFieldChange = (index, newValue) => {
    const updatedValue = value.map((item, i) => (i === index ? newValue : item))
    onChange(updatedValue)
  }

  const handleRemoveField = index => {
    const updatedValue = value.filter((_, i) => i !== index)
    onChange(updatedValue)
  }

  const handleAddField = () => {
    onChange([...value, '']) // Add an empty string as a new field
  }

  return (
    <div >
{showModal && (
  <Modal id={id} value={value} onChangeValue={onChange} islinks={islinks} closeModal={closeModal} /> )}      
      <div  className={value.length ? value.length >= 8 ?'mb-3 scrollable-lt pr-4' :'mb-3 pr-4' : 'pr-4'}>
        {value.map((item, index) => (
          <EuiFlexGroup key={index} alignItems="center">
            <EuiFlexItem>
              <EuiFieldText
              title={title} 
                disabled={disabled}
                placeholder={placeholder}
                value={item}
                onChange={e => handleFieldChange(index, e.target.value)}
                fullWidth
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
              title={title} 
              disabled={disabled}
                aria-label="Remove field"
                iconType="cross"
                color="danger"
                onClick={() => handleRemoveField(index)}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        ))}
      </div>
      <EuiButton className='mr-2' title={title}  disabled={disabled} onClick={handleAddField} iconType="plusInCircle">
        Add Field
      </EuiButton>
       <EuiButtonEmpty 
      color='text'
      onClick={openModal}>{isBulkEdit(value, islinks) ? 'Bulk Edit': 'Bulk Add' }</EuiButtonEmpty>

    </div>
  )
}

export default ListOfTextFields

function stripChars(input) {
  // Remove " or ' from the start of the string
  let result = input.replace(/^[\'\"]+/, '');
  // Remove , from the end of the string
  result = result.replace(/,$/, '');
  // Remove " or ' from the end of the string
  result = result.replace(/[\'\"]+$/, '');
  return result;
}

function parseStringToList(input) {
  input = input.trim();

  // Handle empty string
  if (input === '') {
    return [];
  }

  try {
      // Try to parse as JSON
      const jsonList =  JSON.parse(input);
      if (Array.isArray(jsonList)) {
        return jsonList.map(x=>`${x}`.trim())
      }
  } catch (e) {
    return input.split(/[\n,]+/).map(s => stripChars(s.trim()).trim());
  }
}

function computeItemsLen(value:any[], islinks) {
  
  if (islinks) {
    const a = value.map(getLink).filter(x=>x!== null).length
    return (a > 0 ? ` ${a} `: ' ') + ( islinks ? (a === 1 ? "Link":"Links" ): (a === 1 ?"Item" :"Items"))
      
  }else{
    const a = value.filter(isNotEmpty).length
    return (a > 0 ? ` ${a} `: ' ') + ( islinks ? (a === 1 ? "Link":"Links" ): (a === 1 ?"Item" :"Items"))
  
  }
  
}

function Modal({ closeModal, id, value, onChangeValue, islinks }) {
  const [modaltext, onChangeModalText] = useState(() => {

    if (islinks) {
      return value.filter(isNotEmpty).map(getLink).filter(x=>x!== null).map(x => x.trim()).join('\n')
    }else{
      return value.filter(isNotEmpty).map(x => x.trim()).join('\n')
    }

    
  })
  
  return <EuiModal onClose={closeModal}>
    <ClickOutside handleClickOutside={() => { closeModal() } }>
      <div style={{ minWidth: 720 }}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Paste Items</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
        <TextAreaField
    rows={12}
    placeholder={
     islinks ?  `Paste a list of links in one of the following formats:
     - JSON array (e.g., [\"https://stackoverflow.com/\", \"https://apache.org/\"])
     - Comma separated (e.g., https://stackoverflow.com/, https://apache.org/)
     - Newline separated, e.g. 
          https://stackoverflow.com/
          https://apache.org/`: `Paste a list of items in one of the following formats:
      - JSON array (e.g., [\"apple\", \"guava\"])
      - Comma separated (e.g., apple, guava)
      - Newline-separated, e.g. 
          apple
          guava`}
    name={id}
    value={modaltext}
    onChange={onChangeModalText} />
            </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
          <EuiButton onClick={() => {
            let x = parseStringToList(modaltext)
            
            if (islinks){
              x = x.filter(isNotEmpty).map(getLink).filter(x=>x!== null).map(x=>x.trim())
            } else {
              x = x.filter(isNotEmpty).map(x=>x.trim())
            }
            
            onChangeValue(x)
            closeModal()
          } }>
            {'Add' + computeItemsLen(parseStringToList(modaltext), islinks) }
          </EuiButton>
        </EuiModalFooter>

      </div>
    </ClickOutside>
  </EuiModal>
}