

  showCombos = () => {
    console.log('showCombos');

    this.setState({
      showTotal: true,
    });

    this.props.getGameNumbers(
      0,
      this.props.selectedGame.gameid,
      this.props.selectedGame.stateid,
      this.props.userid,
      this.props.url,
      this.props.gamesNumbersPage,
    );
  };

  showMyNumbers = () => {
    console.log('showMyNumbers');

    this.setState({
      showTotal: false,
      sort: 0,
    });

    if(this.props.myGameNumbers.length == 0)
        {
            this.props.getUserNumbers(
                this.props.userid,
                this.props.selectedGame.gameid,
                0,
                this.props.url,
                this.props.gamesMyNumbersPage,
              );
        }
  };

  showAll = () => {
    this.setState({
      sort: 0,
    });
  };

  showPicked = () => {
    this.setState({
      sort: 1,
    });
  };

  showAssigned = () => {
    this.setState({
      sort: 2,
    });
  };

  selectItem(item) {
    console.log('number item: ' + JSON.stringify(item));
    //console.log('state: ' + JSON.stringify(this.state));

    var status;

    if (item.item.selected == true) {
      console.log('remove numbers');
      //this.props.removeNumbers(item);

      status = 0;

      this.setState({
        addingNumber: false,
      });
    } else {
      console.log('add numbers');
      //this.props.selectNumbers(item);

      status = 1;

      this.setState({
        addingNumber: true,
      });
    }

    this.props.manageNumbers(
      item.item.numbers,
      1,
      this.props.selectedGame.gameid,
      1,
      this.props.userid,
      status,
      0,
      this.props.url,
    );
  }

  validateQuickAdd = () => {
    var patt = /^[0-9]\s[0-9]\s[0-9]$/;
    var pos = this.state.quickAddVal.match(patt);
    //console.log("pos: " + pos)

    if (pos) {
      //console.log("quickAdd")

      var myCurrentNumbers = this.props.myGameNumbers.filter(
        (item) => item.numbers == this.state.quickAddVal,
      );

      var gameCurrentNumbers = this.props.gameNumbers.filter(
        (item) => item.numbers == this.state.quickAddVal,
      );

      // console.log('myCurrentNumbers: ' + myCurrentNumbers.length);
      // console.log('gameCurrentNumbers: ' + gameCurrentNumbers.length);

      if (myCurrentNumbers.length == 0 && gameCurrentNumbers.length == 0) {
        this.setState({
          quickAddEnabled: true,
        });
      }
    } else {
      //console.log("na")

      this.setState({
        quickAddEnabled: false,
      });
    }
  };

  submitQuickAdd = () => {
    if (this.state.quickAddEnabled) {
      console.log('submitQuickAdd');
    }

    this.props.manageNumbers(
      this.state.quickAddVal,
      1,
      this.props.selectedGame.gameid,
      1,
      this.props.userid,
      0,
      1,
      this.props.url,
    );
  };

  changeVal = (val) => {
    console.log('changeVal: ' + val);

    if (val) {
      if (val.length <= 5) {
        this.setState({
          quickAddVal: val,
        });
      }
    }
  };

  manageGame = (item) => {
    item.url = this.props.url;
    item.status = item.joined;
    item.userid = this.props.userid;

    console.log('manageGame numbersList: ' + JSON.stringify(item));

    this.props.manageGame(item);

    this.props.navigation.pop();
  };