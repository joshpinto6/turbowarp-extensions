// Some parts of this scripts are based on or designed to be compatible-ish with:
// https://arpruss.github.io/gamepad.js (MIT Licensed)

(function(Scratch) {
  'use strict';

  const DEADZONE = 0.1;

  /**
   * @param {number} index 1-indexed index
   * @returns {Gamepad|null}
   */
  const getGamepad = (index) => navigator.getGamepads()[index - 1];

  /**
   * @param {Gamepad} gamepad 
   * @param {number} buttonIndex 1-indexed index
   * @returns {boolean} false if button does not exist
   */
  const isButtonPressed = (gamepad, buttonIndex) => {
    const button = gamepad.buttons[buttonIndex - 1];
    if (!button) {
      return false;
    }
    return button.pressed;
  };

  /**
   * @param {Gamepad} gamepad
   * @param {number} axisIndex 1-indexed index
   * @returns {number} 0 if axis does not exist
   */
  const getAxisValue = (gamepad, axisIndex) => {
    const axisValue = gamepad.axes[axisIndex - 1];
    if (typeof axisValue !== 'number') {
      return 0;
    }
    if (Math.abs(axisValue) < DEADZONE) {
      return 0;
    }
    return axisValue;
  };

  class GamepadExtension {
    getInfo() {
      return {
        id: 'Gamepad',
        name: 'Gamepad',
        blocks: [
                    {
                    opcode: 'whenButtonDown',
                    text: "when button [b] of pad [i] pressed",
                    blockType: BlockType.HAT,
                    arguments: {
                        b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'buttonMenu'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
                    }
                },
                              {
                    opcode: 'whenGamepadConnected',
                    text: "when gamepad [pad] connected",
                    blockType: BlockType.HAT,
                    arguments: {
                        pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
                    }
                },
          {
            opcode: 'gamepadConnected',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is gamepad [pad] connected?',
            arguments: {
              pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },

          {
            opcode: 'buttonDown',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'button [b] of pad [i] pressed?',
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'buttonMenu'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },
          {
            opcode: 'axisValue',
            blockType: 'reporter',
            text: 'value of axis [b] on pad [i]',
            arguments: {
              b: {
                type: 'number',
                defaultValue: '1',
                menu: 'axisMenu'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },

          '---',

          {
            opcode: 'axisDirection',
            blockType: 'reporter',
            text: 'direction of axes [axis] on pad [pad]',
            arguments: {
              axis: {
                type: 'number',
                defaultValue: '1',
                menu: 'axesGroupMenu'
              },
              pad: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },
          {
            opcode: 'axisMagnitude',
            blockType: 'reporter',
            text: 'magnitude of axes [axis] on pad [pad]',
            arguments: {
              axis: {
                type: 'number',
                defaultValue: '1',
                menu: 'axesGroupMenu'
              },
              pad: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },

          /*
          {
            opcode: 'buttonPressedReleased',
            blockType: 'hat',
            text: 'button [b] [pr] of pad [i]',
            arguments: {
              b: {
                type: 'number',
                defaultValue: '1'
              },
              pr: {
                type: 'number',
                defaultValue: '1',
                menu: 'pressReleaseMenu'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },

          {
            opcode: 'axisMoved',
            blockType: 'hat',
            text: 'axis [b] of pad [i] moved',
            arguments: {
              b: {
                type: 'number',
                defaultValue: '1'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },
          */

          '---',

          {
            opcode: 'rumble',
            blockType: 'command',
            text: 'rumble strong [s] and weak [w] for [t] sec. on pad [i]',
            arguments: {
              s: {
                type: 'number',
                defaultValue: '0.25'
              },
              w: {
                type: 'number',
                defaultValue: '0.5'
              },
              t: {
                type: 'number',
                defaultValue: '0.25'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },
        ],
        menus: {
          padMenu: {
            acceptReporters: true,
            items: [
              {
                text: '1',
                value: '1'
              },
              {
                text: '2',
                value: '2'
              },
              {
                text: '3',
                value: '3'
              },
              {
                text: '4',
                value: '4'
              }
            ],
          },
          buttonMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: 'A (1)',
                value: '1'
              },
              {
                text: 'B (2)',
                value: '2'
              },
              {
                text: 'X (3)',
                value: '3'
              },
              {
                text: 'Y (4)',
                value: '4'
              },
              {
                text: 'Left bumper (5)',
                value: '5'
              },
              {
                text: 'Right bumper (6)',
                value: '6'
              },
              {
                text: 'Left trigger (7)',
                value: '7'
              },
              {
                text: 'Right trigger (8)',
                value: '8'
              },
              {
                text: 'Select/View (9)',
                value: '9'
              },
              {
                text: 'Start/Menu (10)',
                value: '10'
              },
              {
                text: 'Left stick (11)',
                value: '11'
              },
              {
                text: 'Right stick (12)',
                value: '12'
              },
              {
                text: 'D-pad up (13)',
                value: '13'
              },
              {
                text: 'D-pad down (14)',
                value: '14'
              },
              {
                text: 'D-pad left (15)',
                value: '15'
              },
              {
                text: 'D-pad right (16)',
                value: '16'
              },
            ]
          },
          axisMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: 'Left stick horizontal (1)',
                value: '1'
              },
              {
                text: 'Left stick vertical (2)',
                value: '2'
              },
              {
                text: 'Right stick horizontal (3)',
                value: '3'
              },
              {
                text: 'Right stick vertical (4)',
                value: '4'
              }
            ]
          },
          axesGroupMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: 'Left stick (1 & 2)',
                value: '1'
              },
              {
                text: 'Right stick (3 & 4)',
                value: '3'
              }
            ]
          },
          /*
          pressReleaseMenu: [
            {
              text: 'press',
              value: 1
            },
            {
              text: 'release',
              value: 0
            }
          ],
          */
        }
      };
    }

    gamepadConnected ({pad}) {
      const gamepad = getGamepad(pad);
      return !!gamepad;
    }

    whenGamepadConnected ({pad}) {
      const gamepad = getGamepad(pad);
      return !!gamepad;
    }
    
    buttonDown ({b, i}) {
      const gamepad = getGamepad(i);
      if (!gamepad) return false;
      return isButtonPressed(gamepad, b);
    }
    
    whenButtonDown ({b, i}) {
      const gamepad = getGamepad(i);
      if (!gamepad) return false;
      return isButtonPressed(gamepad, b);
    }

    axisValue ({b, i}) {
      const gamepad = getGamepad(i);
      if (!gamepad) return 0;
      return getAxisValue(gamepad, b);
    }

    axisDirection ({axis, pad}) {
      const gamepad = getGamepad(pad);
      if (!gamepad) return 90;
      const horizontalAxis = getAxisValue(gamepad, axis);
      const verticalAxis = getAxisValue(gamepad, axis + 1);
      const degrees = Math.atan2(verticalAxis, horizontalAxis) * 180 / Math.PI;
      let scratchDirection = degrees + 90;
      if (scratchDirection < 0) {
        scratchDirection += 360;
      }
      return scratchDirection;
    }

    axisMagnitude ({axis, pad}) {
      const gamepad = getGamepad(pad);
      if (!gamepad) return 0;
      const horizontalAxis = getAxisValue(gamepad, axis);
      const verticalAxis = getAxisValue(gamepad, axis + 1);
      return Math.sqrt(horizontalAxis ** 2 + verticalAxis ** 2);
    }

    rumble ({s, w, t, i}) {
      const gamepad = getGamepad(i);
      if (!gamepad || !gamepad.vibrationActuator) return;
      gamepad.vibrationActuator.playEffect('dual-rumble', {
        startDelay: 0,
        duration: t * 1000,
        weakMagnitude: w,
        strongMagnitude: s
      });
    }
  }

  Scratch.extensions.register(new GamepadExtension());
})(Scratch);
