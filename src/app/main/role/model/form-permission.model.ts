export class FormPermission {
  private _groupIdentifier: string;
  private _read = false;
  private _change = false;
  private _remove = false;

  private _label = '';
  private _readOnly = true;

  constructor(groupIdentifier: string) {
    this._groupIdentifier = groupIdentifier;
  }

  get groupIdentifier(): string {
    return this._groupIdentifier;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get readOnly(): boolean {
    return this._readOnly;
  }

  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  get read(): boolean {
    return this._read;
  }

  set read(value: boolean) {
    this._read = value;

    if (!value) {
      this.change = false;
      this.remove = false;
    }
  }

  get change(): boolean {
    return this._change;
  }

  set change(value: boolean) {
    this._change = value;

    if (!value) {
      this.remove = false;
    } else {
      this.read = true;
    }
  }

  get remove(): boolean {
    return this._remove;
  }

  set remove(value: boolean) {
    this._remove = value;

    if (value) {
      this.read = true;
      this.change = true;
    }
  }
}
