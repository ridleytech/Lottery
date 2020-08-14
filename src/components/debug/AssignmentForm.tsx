import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
//import Picker from "react-native-picker-view"
import {calculateOffer, sendContract, formUpdate} from '../actions';

import {NativeModules} from 'react-native';
import {Textarea, CheckBox} from 'native-base';

var testView = NativeModules.PDFWebview;

class AssignmentForm extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      done: false,
      checked: false,
      checked1: false,
    };
  }

  getDecimal(r): number {
    return parseFloat(r).toFixed(2);
  }

  getPercentage(r): number {
    return r * 100;
  }

  previewContract(): void {
    console.log('showPDF');

    testView
      .showPDF(
        this.props.url,
        this.props.assignor,
        this.props.assignee,
        this.props.propertyAddress,
        this.props.cityStateZip,
        this.props.legalDescription,
        '$' + this.getDecimal(this.props.offer),
        '$' + this.getDecimal(this.props.earnestMoney),
        '$' + this.getDecimal(this.props.dueDiligence),
        this.props.contractDate,
        this.props.recipientEmail,
        this.props.closingDays.toString(),
        this.props.closingLocation,
        'I',
      )
      .then((result) => {
        console.log('show', result);
      });
  }

  sendContract(): void {
    this.props.sendContract(
      this.props.url,
      this.props.assignor,
      this.props.assignee,
      this.props.propertyAddress,
      this.props.cityStateZip,
      this.props.legalDescription,
      this.getDecimal(this.props.offer),
      this.getDecimal(this.props.earnestMoney),
      this.getDecimal(this.props.dueDiligence),
      this.props.contractDate,
      this.props.recipientEmail,
      this.props.closingDays.toString(),
      this.props.closingLocation,
      'F',
    );
  }

  componentDidMount() {
    console.log('url: ' + this.props.url);

    //this.props.calculateOffer('arv', 200000);
  }

  renderInitialView() {
    // if (this.props.phasePicker === true) {
    // } else if (this.props.weekPicker === true) {
    //   return <>{this.showPicker2()}</>
    // } else if (this.props.recordView === true) {
    //   return (
    //     <>
    //       {this.showRecordView()}
    //       {/* <RecordView/> */}
    //     </>
    //   )
    // }
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <ScrollView>
            <Text style={[styles.headerLbl, {marginTop: 50}]}>Assignor</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.assignor}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'assignor', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Assignee</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.assignee}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'assignee', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Property Address</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.propertyAddress}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'propertyAddress', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>City, State, Zip</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.cityStateZip}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'cityStateZip', value: text})
              }
            />
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Legal Description</Text>

            <Textarea
              style={styles.inputAreaTxt}
              value={this.props.legalDescription}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'legalDescription', value: text})
              }
            />

            <Text style={styles.headerLbl}>Offer Amount</Text>

            <TextInput
              style={styles.inputTxt}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'offer', value: text})
              }>
              ${this.getDecimal(this.props.offer)}
            </TextInput>
            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Earnest Money Fee</Text>

            <TextInput
              style={styles.inputTxt}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'earnestMoney', value: text})
              }>
              ${this.getDecimal(this.props.earnestMoney)}
            </TextInput>

            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Due Diligence Fee</Text>

            <TextInput
              style={styles.inputTxt}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'dueDiligence', value: text})
              }>
              ${this.getDecimal(this.props.dueDiligence)}
            </TextInput>

            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Contract Date</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.contractDate}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'contractDate', value: text})
              }
            />

            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Days to Close</Text>

            <TextInput
              style={styles.inputTxt}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'closingDays', value: text})
              }>
              {this.props.closingDays}
            </TextInput>

            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Closing Location</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.closingLocation}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'closingLocation', value: text})
              }
            />

            <View style={styles.separator} />

            <Text style={styles.headerLbl}>Recipient Email</Text>

            <TextInput
              style={styles.inputTxt}
              value={this.props.recipientEmail}
              onChangeText={(text) =>
                this.props.formUpdate({prop: 'recipientEmail', value: text})
              }
            />
            <View style={styles.separator} />

            {/* <View style={styles.recordBtnsView}>
              <Text style={styles.headerLbl4}>Digital Signature</Text>
              <CheckBox
                style={styles.cb}
                checkedIcon={
                  <Image source={require("../images/checked.png")} />
                }
                uncheckedIcon={
                  <Image source={require("../images/unchecked.png")} />
                }
                checked={this.state.digitalSignature}
                onPress={() =>
                  this.setState({
                    digitalSignature: !this.state.digitalSignature,
                  })
                }
              />
            </View> */}

            {/* <View style={styles.recordBtnsView}>
              <Text style={styles.headerLbl4}>PDF Signature</Text>
              <CheckBox
                style={styles.cb}
                checkedIcon={
                  <Image source={require('../images/checked.png')} />
                }
                uncheckedIcon={
                  <Image source={require('../images/unchecked.png')} />
                }
                checked={this.state.pdfSignature}
                onPress={() => [
                  this.setState({pdfSignature: !this.state.pdfSignature}),
                ]}
              />
            </View> */}

            <TouchableOpacity onPress={() => this.previewContract()}>
              <Text style={[styles.previewBtn]}>PREVIEW CONTRACT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.sendContract()}>
              <Text style={[styles.offerBtn]}>SEND</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* {this.renderInitialView()} */}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    offer: state.offer,
    assignor: state.assignor,
    assignee: state.assignee,
    propertyAddress: state.propertyAddress,
    cityStateZip: state.cityStateZip,
    legalDescription: state.legalDescription,
    purchasePrice: state.purchasePrice,
    earnestMoney: state.earnestMoney,
    dueDiligence: state.dueDiligence,
    contractDate: state.contractDate,
    recipientEmail: state.recipientEmail,
    digitalSignature: state.digitalSignature,
    pdfSignature: state.pdfSignature,
    closingDays: state.closingDays,
    closingLocation: state.closingLocation,
    url: state.url,
  };
};

export default connect(mapStateToProps, {
  calculateOffer,
  sendContract,
  formUpdate,
})(AssignmentForm);

const styles = StyleSheet.create({
  cb: {
    //width: 50, height: 50
  },
  subscript: {
    position: 'absolute',
    right: 0,
    fontSize: 25,
    color: '#484848',
  },
  separator: {
    width: 300,
    height: 1,
    backgroundColor: '#DEDEDE',
    marginTop: 5,
    marginBottom: 20,
  },
  headerLbl: {
    color: '#B2B2B2',
    width: 300,
    fontSize: 18,
    //marginBottom: 5
  },
  headerLbl2: {
    color: '#B2B2B2',

    width: 300,
    height: 50,
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  headerLbl3: {
    color: '#B2B2B2',

    width: 150,
    height: 50,
    marginTop: 20,
    fontSize: 20,
    backgroundColor: 'yellow',
  },
  headerLbl4: {
    color: '#B2B2B2',

    width: 150,
    height: 30,
    marginTop: 5,
    fontSize: 20,
  },
  inputTxt: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 20,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  inputTxt2: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 35,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  inputTxt3: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 35,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  inputAreaTxt: {
    color: '#484848',
    overflow: 'hidden',
    width: 300,
    height: 130,
    fontSize: 20,
    paddingTop: 10,
    backgroundColor: '#FAFAFA',
    marginTop: 10,
    marginBottom: 15,
    borderColor: '#DEDEDE',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  inputTextBold: {
    overflow: 'hidden',
    width: 300,
    height: 50,
    fontSize: 35,
    paddingTop: 10,
    backgroundColor: 'white',
    color: '#85DEB1',
    fontWeight: 'bold',
  },
  pickerSelect: {
    textAlign: 'center',
    height: 200,
  },
  recordBtnsView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewBtn: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 15,
    backgroundColor: '#85DEB1',
    color: 'white',
    marginTop: 15,
    width: 300,
    height: 60,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  offerBtn: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 15,
    backgroundColor: '#85DEB1',
    color: 'white',
    marginTop: 15,
    width: 300,
    height: 60,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  picker: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    backgroundColor: 'white',
    height: 500,
  },
  picker2: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    backgroundColor: 'white',
    height: 500,
  },
});
