import styled from 'styled-components';
import { mean } from 'lodash';
import { MouseEvent, useEffect, useState } from 'react';

const Wrapper = styled.div`
  position: fixed;
  top: 0; right: 0;
  padding: 8px;
  font-size: 10px;

  ul {
    position: absolute;
    right: 0;
  }

  li {
    padding: 8px;
    white-space: nowrap;
  }
`;

export function Joycon({
  onMove = function() {},
  onMoveL = function() {},
  onMoveR = function() {},
  onClickL = function() {},
  onClickR = function() {},
  onStickL = function(_x: number, _y: number) {},
  onClickUp = function() {},
  onClickDown = function() {},
  onClickLeft = function() {},
  onClickRight = function() {}
}) {
  let JoyCon: any;
  const [ deviceList, setDeviceList ] = useState<string[]>([]);
  const [ isPressL, setIsPressL ] = useState(false);
  const [ isPressR, setIsPressR ] = useState(false);
  const [ isPressUp, setIsPressUp ] = useState(false);
  const [ isPressDown, setIsPressDown ] = useState(false);
  const [ isPressLeft, setIsPressLeft ] = useState(false);
  const [ isPressRight, setIsPressRight ] = useState(false);

  useEffect(() => {
    if (isPressL) {
      onClickL();
    }
  }, [isPressL]);

  useEffect(() => {
    if (isPressR) {
      onClickR();
    }
  }, [isPressR]);

  useEffect(() => {
    if (isPressR) {
      onClickUp();
    }
  }, [isPressUp]);

  useEffect(() => {
    if (isPressDown) {
      onClickDown();
    }
  }, [isPressDown]);

  useEffect(() => {
    if (isPressLeft) {
      onClickLeft();
    }
  }, [isPressLeft]);

  useEffect(() => {
    if (isPressRight) {
      onClickRight();
    }
  }, [isPressRight]);

  try {
    JoyCon = require('@/scripts/joy-con-webhid/dist/index.js');
  } catch (err) {
    console.error(err);
  }

  async function handleClickBtnConnect(evt: MouseEvent) {
    (evt.target as HTMLButtonElement).blur();

    if (!JoyCon) return;

    const totals: number[] = [];
    const countLength = 10;
    const limit = .04;

    let canAttackTimer = -1;
    let canAttack = true;
    let count = 0;

    await JoyCon.connectJoyCon();

    for (const joyCon of JoyCon.connectedJoyCons.values()) {
      const { device } = joyCon;

      joyCon.rumble(600, 600, .4);

      setDeviceList([ ...deviceList, device.productName ]);

      joyCon.addEventListener('hidinput', ({ detail }: any) => {
        if (Object.keys(detail.buttonStatus).includes('l')) {
          setIsPressUp(!!detail.buttonStatus.up);
          setIsPressDown(!!detail.buttonStatus.down);
          setIsPressLeft(!!detail.buttonStatus.left);
          setIsPressRight(!!detail.buttonStatus.right);
          setIsPressL(!!detail.buttonStatus.l);
          onStickL(Number(detail.analogStickLeft.horizontal), Number(detail.analogStickLeft.vertical));
        } else if (Object.keys(detail.buttonStatus).includes('r')) {
          setIsPressR(!!detail.buttonStatus.r);
        }

        if (detail.actualAccelerometer) {
          const total = Math.abs(detail.actualAccelerometer.x) + Math.abs(detail.actualAccelerometer.y) + Math.abs(detail.actualAccelerometer.z);

          totals[count] = total;

          if (limit < mean(totals)) {
            if (canAttack) {
              canAttack = false;
              window.clearTimeout(canAttackTimer);

              canAttackTimer = window.setTimeout(() => {
                canAttack = true;
              }, 400);

              if (Object.keys(detail.buttonStatus).includes('l')) {
                onMoveL();
              } else if (Object.keys(detail.buttonStatus).includes('r')) {
                onMoveR();
              }

              onMove();
            }
          }

          count = (count + 1) % countLength;
        }
      });
    }
  }

  return (
    <Wrapper>
      <button onClick={ handleClickBtnConnect }>connect</button>
      <ul>
        {deviceList.map((name, i) => {
          return (
            <li key={ i }>
              <span>{ name }</span>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
}