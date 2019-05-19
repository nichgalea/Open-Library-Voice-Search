import voiceService from "src/services/voice.service";
import cx from "classnames";

import styles from "./styles.scss";
import micSvg from "./mic.svg";
import micOutlineSvg from "./mic-outline.svg";

export class RecordButtonComponent extends HTMLElement {
  public static readonly selector = "lib-record-button";

  private button!: HTMLButtonElement;

  private isListening = false;
  private set isListeningState(value: boolean) {
    this.isListening = value;

    if (value) {
      this.button.innerHTML = micSvg;
      this.button.className = cx(styles.micButton, styles.micButtonListening);
    } else {
      this.button.innerHTML = micOutlineSvg;
      this.button.className = styles.micButton;
    }
  }

  constructor(
    private onNoCommand: () => void,
    private onInvalidCommand: () => void,
    private onResult: (result: string) => void
  ) {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.className = styles.mic;
    this.button = document.createElement("button");
    this.button.title = "Voice command search";
    this.button.innerHTML = micSvg;
    this.button.onclick = this.handleClick;
    this.isListeningState = false;

    this.appendChild(this.button);
  }

  private handleClick() {
    if (this.isListening) {
      this.isListeningState = false;
      voiceService.stopListening();
    } else {
      this.isListeningState = true;

      voiceService
        .startListening()
        .then(result => {
          this.isListeningState = false;

          if (result) {
            this.onResult(result);
          } else {
            this.onInvalidCommand();
          }
        })
        .catch((speechError: SpeechRecognitionError) => {
          this.isListeningState = false;

          if (speechError.error === "no-speech") {
            this.onNoCommand();
          }
        });
    }
  }
}
