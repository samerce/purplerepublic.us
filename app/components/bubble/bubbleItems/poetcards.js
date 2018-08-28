import React from 'react'
import SlackInput from '../../../containers/Politics/SlackInput'

import {
  BubbleComponentRoot as Root, PoetCardRow, QuantityInput, PoetCardTotal, Intro,
  ImageRoot, QuantityRoot, Checkout, CustomerInfo, Name, Email, Address,
  PaymentInstructions, InstructionRow, InstructionNumber, Instructions,
  InstructionEmphasis, ActionButtons, ExitAction, ContinueAction, CustomerInfoTitle,
  CheckoutTitle, CopiedMsg, ThanksRoot, ThanksMsg,
} from './styled'

import autobind from 'autobind-decorator'
import {openInNewTab} from '../../../utils/nav'
import {makeEnum} from '../../../utils/lang'
import ClipboardJS from 'clipboard'
import {connect} from 'react-redux'

import {SRC_URL} from '../../../global/constants'
import {Poetcards} from '../config'

const Clipboard = new ClipboardJS('.copiable')
const Mode = makeEnum([
  'cardPicker',
  'checkoutInfo',
  'checkoutPayment',
  'checkoutThanks',
])

@connect(d => ({
  lastClickedAction: d.get('bubbleDetails').get('lastClickedAction')
}))
export default class PoetcardsBubble extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      quantities: {},
      mode: Mode.cardPicker,
    }

    Clipboard.on('success', e => {
      const {parentNode} = e.trigger
      const originalClasses = '' + parentNode.className
      parentNode.className = originalClasses + ' justCopied'
      setTimeout(() => {
        parentNode.className = originalClasses.replace('justCopied', '')
      }, 3000)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lastClickedAction !== this.props.lastClickedAction) {
      if (nextProps.lastClickedAction.action.type === 'OrderPoetcards') {
        if (this.getTotalQuantity() < 5) {
          return alert('please pick at least 5 cards')
        }
        this.orderNumber = Date.now()
        this.setState({mode: Mode.checkoutInfo})
      }
    }
  }

  render() {
    const {mode} = this.state
    const price = this.getPrice()
    const totalQuantity = this.getTotalQuantity()
    return (
      <Root className={'poetcards-' + mode}>
        <Intro>find your favorite cards. enter the quantity you want in the box to the right. here's the price breakdown:</Intro>

        <img src={SRC_URL + 'poetcards/price-sheet.jpg'} className='price-sheet' />

        {Poetcards.map(this.renderPoetCardRow)}

        <PoetCardTotal>
          {totalQuantity.toLocaleString()} cards @ ${price.unit} = ${price.prettyTotal}
        </PoetCardTotal>

        <SlackInput
          channel='poetcards'
          className='poetcards-slack'
          ref={r => this.slackInput = r}
        />

        <Checkout>
          <CheckoutTitle>
            {(mode === Mode.checkoutInfo || mode === Mode.checkoutPayment) &&
              'your order'
            }
            {mode === Mode.checkoutThanks && 'thanks, ' + this.nameInput.value + '!'}
          </CheckoutTitle>

          <CustomerInfo>
            <CustomerInfoTitle><div>enter your info</div></CustomerInfoTitle>
            <Name
              innerRef={r => this.nameInput = r}
              placeholder='name'
            />
            <Email
              innerRef={r => this.emailInput = r}
              placeholder='email'
            />
            <Address
              innerRef={r => this.addressInput = r}
              placeholder='address'
            />
          </CustomerInfo>

          <ThanksMsg>
            <InstructionEmphasis className='orderNumber'>
              ORDER #{this.orderNumber}
            </InstructionEmphasis><br />
            watch your email for updates on your order.<br />
            cards usually arrive in about a week.<br />
            <a href='mailto:paradox@expressyourmess.com'>contact us</a> to change, cancel, or rush your order!<br />
          </ThanksMsg>

          <PaymentInstructions>
            <InstructionRow>
              <InstructionNumber>1</InstructionNumber>
              <Instructions>click here to copy total amount ⤵</Instructions>
              <InstructionEmphasis>
                <button className='copiable' data-clipboard-text={price.total} />
                ${price.prettyTotal}
                <CopiedMsg><div>copied!</div></CopiedMsg>
              </InstructionEmphasis>
            </InstructionRow>
            <InstructionRow>
              <InstructionNumber>2</InstructionNumber>
              <Instructions>click here and paste the total in paypal ⤵</Instructions>
              <InstructionEmphasis onClick={this.onClickGoToPaypal}>
                go to paypal
              </InstructionEmphasis>
            </InstructionRow>
            <InstructionRow>
              <InstructionNumber>3</InstructionNumber>
              <Instructions>put order number in paypal's NOTE box.<br/>
                click here to copy order number ⤵</Instructions>
              <InstructionEmphasis>
                <button className='copiable' data-clipboard-text={'#' + this.orderNumber} />
                #{this.orderNumber}
                <CopiedMsg><div>copied!</div></CopiedMsg>
              </InstructionEmphasis>
            </InstructionRow>
            <InstructionRow>
              <InstructionNumber>4</InstructionNumber>
              <Instructions>
                avoid fees — DON'T TICK the "goods & services" box.<br />
                after you've paid, click here ⤵
              </Instructions>
              <InstructionEmphasis onClick={this.onClickPaymentSent}>
                i sent the payment
              </InstructionEmphasis>
            </InstructionRow>
          </PaymentInstructions>

          <ActionButtons>
            <ExitAction onClick={this.onClickExit}>close</ExitAction>
            <ContinueAction onClick={this.onClickContinue}>
              continue
            </ContinueAction>
          </ActionButtons>

        </Checkout>
      </Root>
    )
  }

  @autobind
  renderPoetCardRow(p) {
    const imageSrc = SRC_URL + 'poetcards/' + p + '.jpg'
    return (
      <PoetCardRow className={p}>
        <ImageRoot>
          <img
            onClick={() => openInNewTab(imageSrc)}
            src={imageSrc} />
        </ImageRoot>

        <QuantityRoot>
          <QuantityInput
            placeholder={p === 'front'? 'quantity ↓' : 0}
            value={this.state.quantities[p]}
            onChange={e => this.onChangeQuantity(p, e.target.value)}
          />
        </QuantityRoot>
      </PoetCardRow>
    )
  }

  @autobind
  onChangeQuantity(p, quantity) {
    this.setState({
      quantities: {
        ...this.state.quantities,
        [p]: quantity
      }
    })
  }

  @autobind
  onClickContinue() {
    const {nameInput, emailInput, addressInput} = this
    if (!nameInput.value || !emailInput.value || !addressInput.value) {
      return alert('please enter all your info before continuing')
    }
    this.setState({mode: Mode.checkoutPayment})
  }

  @autobind
  onClickGoToPaypal() {
    openInNewTab('https://www.paypal.me/expressurmess')
  }

  @autobind
  onClickPaymentSent() {
    const {quantities} = this.state
    const totalQuantity = this.getTotalQuantity().toLocaleString()
    const price = this.getPrice()
    const cartList =
      Object.keys(quantities)
      .map(k => quantities[k].toLocaleString() + ' — ' + k)
      .join("\n")
    const customerInfo = this.nameInput.value + ' — ' + this.emailInput.value + ' — ' + this.addressInput.value
    this.slackInput.post(
      '$' + price.prettyTotal + ' — ' + totalQuantity + ' @ $' + price.unit + 'ea\n' +
      customerInfo + '\n' +
      cartList +  '\n' +
      '🎉——————————————🤩———————————————🎉'
    )
    this.setState({mode: Mode.checkoutThanks})
  }

  @autobind
  onClickExit() {
    this.setState({mode: Mode.cardPicker})
  }

  getPrice() {
    const totalQuantity = this.getTotalQuantity()
    let unitPrice

    if (totalQuantity < 10) unitPrice = 3
    else if (totalQuantity < 100) unitPrice = 2
    else if (totalQuantity < 250) unitPrice = 1.5
    else if (totalQuantity < 500) unitPrice = 1.3
    else if (totalQuantity < 1000) unitPrice = 1.1
    else if (totalQuantity < 2500) unitPrice = .99
    else if (totalQuantity < 5000) unitPrice = .79
    else unitPrice = .75

    const total = (unitPrice * totalQuantity)
    return {
      unit: unitPrice.toFixed(2),
      total: total.toFixed(2),
      prettyTotal: total.toLocaleString()
    }
  }

  getTotalQuantity() {
    return Object.values(this.state.quantities).reduce(
      (v, total) => Number(v) + Number(total)
    , 0)
  }

}
