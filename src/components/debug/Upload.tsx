import React, { Component } from "react"
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native"

import PlayBtnDisabled from "../images/play-btn-disabled.png"
import PlayBtn from "../images/play-button.png"
import RecordBtn from "../images/record-btn.png"
import StopBtn from "../images/stop-button.png"

import { Provider, connect } from "react-redux"
import Picker from "react-native-picker-view"
import RNPickerSelect from "react-native-picker-select"
import {
  selectPhaseText,
  managePlay,
  enableTranslationPlay,
  recordingSelected,
  playSelected,
  getLanguages,
  updateDestinations,
  updateSourceIndex,
  updateDestinationIndex,
} from "../actions"
import {
  selectWeekText,
  doneSelectDestination,
  recordVoice,
  uploadFile,
  showRecorder,
} from "../actions"

import { NativeModules } from "react-native"

//https://cloud.ibm.com/docs/services/language-translator?topic=language-translator-translation-models&_ga=2.177083109.1316562496.1587329371-2122000289.1587225838&cm_mc_uid=28734272216515735240455&cm_mc_sid_50200000=75297191587468999648&cm_mc_sid_52640000=43583671587468999656
//https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices
//https://cloud.ibm.com/docs/services/speech-to-text?topic=speech-to-text-models

//var testView = NativeModules.PopupTest2;

class Upload extends Component {
  constructor() {
    super()

    // var local = true;
    // var localPath = 'http://localhost:8888/ridtech/languagetranslator/';
    // var remotePath = 'http://agiledevelopment.xyz/languagetranslator/';
    // var url;

    // if(local)
    // {
    //     url = localPath;
    // }
    // else
    // {
    //     url = remotePath;
    // }

    this.state = {
      index: 0,
      weekIndex: 0,
      isPlaying: false,
      isRecording: false,
      // source: "English",
      // destination: "Spanish",
      // sourceIndex: 0,
      // sourceIndex: 0,
      // selectedSourceID: 6,
      // selectedTranslationCode: "en-es",

      hasFile: false,
      hasTranslationFile: false,
    }
  }

  componentDidMount() {
    this.setupRecorder(this.props.url)
    this.props.getLanguages(this.props.url)
    this.props.updateDestinations(6, this.props.url)

    //console.log("stt: " + JSON.stringify(this.props.sttSources));
  }

  showPicker1 = () => {
    //this.setState({source: this.props.sttSources[0], sourceIndex: 0, selectedSourceID: this.props.sttIDs[0]})

    return (
      <View style={styles.picker}>
        <Picker
          values={this.props.sttSources}
          selected={this.props.sourceIndex}
          enableInput={false}
          onSelect={(value, index) => {
            console.log("onSelect", value, index)

            this.props.updateSourceIndex(value, index)

            //console.log('selectedID', this.props.sttIDs[index]);

            this.setState({
              source: value,
              sourceIndex: index,
              selectedSourceID: this.props.sttIDs[index],
            })
          }}
        />

        {/* <RNPickerSelect style={pickerSelectStyles}
                  onValueChange={(value) => console.log(value)}
                  items={[
                      { label: 'Football', value: 'football' },
                      { label: 'Baseball', value: 'baseball' },
                      { label: 'Hockey', value: 'hockey' },
                  ]}
              /> */}

        <Text
          style={styles.doneBtn}
          onPress={() => [
            this.props.doneSelectSource(
              this.state.source,
              this.state.sourceIndex,
              this.state.destination,
              this.state.selectedSourceID
            ),
            this.props.updateDestinations(this.state.selectedSourceID),
          ]}
        >
          Done
        </Text>
      </View>
    )
  }

  showPicker2 = () => {
    //this.setState({destination: this.props.sttDestinations[0], destinationIndex: 0, selectedDestinationID: this.props.sttDestinationIDs[0], selectedTranslationCode: this.props.translationCodes[0]})

    return (
      <View style={styles.picker2}>
        <Picker
          values={this.props.sttDestinations}
          selected={this.props.destinationIndex}
          enableInput={false}
          onSelect={(value, index) => {
            console.log("onSelect", value, index)

            this.props.updateDestinationIndex(value, index)

            //this.setState({destination: value, destinationIndex: index})
            this.setState({
              destination: value,
              destinationIndex: index,
              selectedDestinationID: this.props.sttDestinationIDs[index],
              selectedTranslationCode: this.props.translationCodes[index],
            })

            //this.checkSelections();

            //console.log("selectedTranslationCode: "+this.state.selectedTranslationCode)

            //console.log("state select: "+JSON.stringify(this.state))
          }}
        />
        <Text
          style={styles.doneBtn}
          onPress={() =>
            this.props.doneSelectDestination(
              this.state.destination,
              this.state.destinationIndex,
              this.state.source,
              this.state.selectedTranslationCode
            )
          }
        >
          Done
        </Text>
      </View>
    )
  }

  showRecordView = () => {
    //this.setState({destination: this.props.sttDestinations[0], destinationIndex: 0, selectedDestinationID: this.props.sttDestinationIDs[0], selectedTranslationCode: this.props.translationCodes[0]})

    return (
      <View style={styles.recordVOuter}>
        <View style={styles.recordV}>
          {/* <Text style={styles.recordViewHeader}>RECORD</Text> */}
          {/* playBtn: state.playBtn,
        playTranslationBtn: state.playTranslationBtn,
        recordBtn: state.playBtn */}
          <View style={styles.recordVButtons}>
            <TouchableOpacity
              style={styles.recordViewStart}
              onPress={() => this.manageRecording()}
            >
              <View>
                <Image
                  source={this.props.recordBtn}
                  style={styles.recordViewStart}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.recordViewPlay}
              onPress={() => this.manageRecordingPlaying()}
            >
              <View>
                <Image
                  source={this.props.playBtn}
                  style={styles.recordViewPlay}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.recordBtn2,
              { backgroundColor: this.props.recordColor },
            ]}
            onPress={() => this.finishRecording()}
          >
            DONE
          </Text>
        </View>
      </View>
    )
  }

  renderInitialView() {
    if (this.props.phasePicker === true) {
      return <>{this.showPicker1()}</>
    } else if (this.props.weekPicker === true) {
      return <>{this.showPicker2()}</>
    } else if (this.props.recordView === true) {
      return (
        <>
          {this.showRecordView()}

          {/* <RecordView/> */}
        </>
      )
    }
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          {/* <Text>Url: {this.props.url}</Text> */}
          <Text
            style={styles.phaseTxt}
            onPress={() => this.props.selectPhaseText()}
          >
            {this.props.source}
          </Text>
          <Text
            style={styles.weekTxt}
            onPress={() => this.props.selectWeekText()}
          >
            {this.props.destination}
          </Text>
          <Text
            style={[
              styles.translateBtn,
              { backgroundColor: this.props.playColor },
            ]}
            onPress={() => this.translateFile()}
          >
            TRANSLATE
          </Text>
          <View style={styles.recordBtnsView}>
            {/* {this.props.recordBtnStatus} */}
            <Text
              style={[
                styles.recordBtn,
                { backgroundColor: this.props.recordColor },
              ]}
              onPress={() => this.showRecorder()}
            >
              RECORD
            </Text>
            {/* {this.props.playBtnStatus} */}
            <Text
              style={[
                styles.playBtn,
                { backgroundColor: this.props.playTranslationColor },
              ]}
              onPress={() => this.manageTranslationPlaying()}
            >
              {this.props.playBtnStatus}
            </Text>
          </View>
          {this.renderInitialView()}
        </View>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    source: state.source,
    sttSources: state.sttSources,
    sttIDs: state.sttIDs,
    sttDestinations: state.sttDestinations,
    sttDestinationIDs: state.sttDestinationIDs,
    sttCodes: state.sttCodes,
    translationCodes: state.translationCodes,
    destination: state.destination,
    recordColor: state.recordColor,
    playColor: state.playColor,
    playTranslationColor: state.playTranslationColor,
    sourceIndex: state.sourceIndex,
    sourceLanguages: state.sourceLanguages,
    destinationIndex: state.destinationIndex,
    destinationLanguages: state.destinationLanguages,
    phasePicker: state.phasePicker,
    weekPicker: state.weekPicker,
    recordBtnStatus: state.recordBtnStatus,
    playBtnStatus: state.playBtnStatus,
    recordView: state.recordView,
    playBtn: state.playBtn,
    playTranslationBtn: state.playTranslationBtn,
    recordBtn: state.recordBtn,
  }
}

export default connect(
  mapStateToProps,
  {
    recordVoice,
    selectPhaseText,
    selectWeekText,
    doneSelectDestination,
    recordingSelected,
    managePlay,
    enableTranslationPlay,
    playSelected,
    getLanguages,
    updateDestinations,
    updateSourceIndex,
    updateDestinationIndex,
    showRecorder,
  }
)(Upload)

const styles = StyleSheet.create({
  recordVButtons: {
    paddingTop: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 100,
    alignItems: "center",
    width: 250,
  },
  navIcon: {
    width: 50,
    height: 50,
  },
  recordViewHeader: {
    fontSize: 23,
    color: "gray",
    fontWeight: "bold",
  },
  recordVOuter: {
    display: "flex",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  recordV: {
    width: Dimensions.get("window").width,
    height: 300,
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  recordViewPlay: {
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 50,
  },
  recordViewStart: {
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 50,
  },
  pickerSelect: {
    textAlign: "center",
    height: 200,
  },
  recordBtnsView: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  translateBtn: {
    borderRadius: 30,
    overflow: "hidden",
    paddingTop: 15,
    backgroundColor: "rgb(160,160,160)",
    color: "white",
    marginTop: 15,
    width: 300,
    height: 60,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  recordBtn: {
    borderRadius: 30,
    overflow: "hidden",
    paddingTop: 17,
    //backgroundColor: "rgb(123,237,141)",
    backgroundColor: "rgb(160,160,160)",
    color: "white",
    marginTop: 15,
    height: 60,
    fontSize: 20,
    width: 150,
    marginRight: 10,
    fontWeight: "bold",
    textAlign: "center",
  },

  recordBtn2: {
    borderRadius: 30,
    overflow: "hidden",
    paddingTop: 17,
    // backgroundColor: "rgb(123,237,141)",
    backgroundColor: "rgb(160,160,160)",
    color: "white",
    marginTop: 75,
    height: 60,
    fontSize: 20,
    width: 300,
    marginRight: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  playBtn: {
    borderRadius: 30,
    overflow: "hidden",
    paddingTop: 15,
    backgroundColor: "rgb(160,160,160)",
    color: "white",
    marginTop: 15,
    height: 60,
    fontSize: 20,
    width: 150,
    fontWeight: "bold",
    textAlign: "center",
  },

  container: {
    alignItems: "center",
  },
  headerLbl: {
    width: 300,
    height: 50,
    marginTop: 50,
    fontSize: 20,
    textAlign: "center",
  },
  headerLbl2: {
    width: 300,
    height: 50,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
  phaseLbl: {},
  phaseTxt: {
    color: "rgb(166,188,208)",
    borderRadius: 8,
    backgroundColor: "rgb(240,244,248)",
    overflow: "hidden",
    width: 300,
    height: 50,
    marginTop: 50,
    fontSize: 24,
    textAlign: "center",
    paddingTop: 10,
  },
  weekTxt: {
    color: "rgb(166,188,208)",
    borderRadius: 8,
    backgroundColor: "rgb(240,244,248)",
    overflow: "hidden",
    width: 300,
    height: 50,
    marginTop: 10,
    fontSize: 24,
    textAlign: "center",
    paddingTop: 10,
  },
  picker: {
    width: Dimensions.get("window").width,
    position: "absolute",
    backgroundColor: "white",
    height: 500,
  },
  picker2: {
    width: Dimensions.get("window").width,
    position: "absolute",
    backgroundColor: "white",
    height: 500,
  },
  doneBtn: {
    backgroundColor: "gray",
    color: "white",
    textAlign: "center",
    height: 65,
    marginTop: 15,
    paddingTop: 20,
    fontSize: 22,
  },
})
