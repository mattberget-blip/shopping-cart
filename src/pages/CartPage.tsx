import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'
import './CartPage.css'

type CheckoutForm = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  paymentMethod: 'card' | 'paypal'
  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
}

type CartLocationState = {
  buyNow?: Product
}

const emptyForm: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
}

export function CartPage() {
  const { items, total, updateQuantity } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const buyNowProduct = (location.state as CartLocationState | null)?.buyNow
  const isBuyNow = Boolean(buyNowProduct)

  const [showCheckout, setShowCheckout] = useState(isBuyNow)
  const [form, setForm] = useState<CheckoutForm>(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  const checkoutTotal = isBuyNow && buyNowProduct ? buyNowProduct.price : total

  function updateField<K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function handleCheckoutSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Send checkout details to a payment / order API
    setSubmitted(true)
  }

  function handleCancelCheckout() {
    if (isBuyNow && buyNowProduct) {
      navigate(`/product/${buyNowProduct.id}`, { replace: true })
      return
    }
    setShowCheckout(false)
  }

  if (!isBuyNow && items.length === 0) {
    return (
      <section className="cart">
        <header className="cart__header">
          <h1 className="cart__title">Your cart</h1>
          <p className="cart__subtitle">Your cart is empty.</p>
        </header>
        <Link to="/browse" className="btn btn--primary">
          Start Shopping
        </Link>
      </section>
    )
  }

  if (isBuyNow && buyNowProduct) {
    return (
      <section className="cart">
        <header className="cart__header">
          <h1 className="cart__title">Buy now</h1>
          <p className="cart__subtitle">
            Complete checkout for this item only. It will not be added to your
            cart.
          </p>
        </header>

        <ul className="cart__list">
          <li className="cart__item">
            <img
              src={buyNowProduct.image}
              alt={buyNowProduct.name}
              className="cart__item-image"
            />
            <div className="cart__item-info">
              <span className="cart__item-name">{buyNowProduct.name}</span>
              <span className="cart__item-unit">Qty 1</span>
            </div>
            <span className="cart__item-price">
              ${buyNowProduct.price.toFixed(2)}
            </span>
          </li>
        </ul>

        <div className="cart__footer">
          <div className="cart__total">
            <span>Total</span>
            <span className="cart__total-amount">
              ${checkoutTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <CheckoutFormFields
          form={form}
          submitted={submitted}
          checkoutTotal={checkoutTotal}
          updateField={updateField}
          onSubmit={handleCheckoutSubmit}
          onCancel={handleCancelCheckout}
        />
      </section>
    )
  }

  return (
    <section className="cart">
      <header className="cart__header">
        <h1 className="cart__title">Your cart</h1>
        <p className="cart__subtitle">
          Review your items before heading to checkout.
        </p>
      </header>

      <ul className="cart__list">
        {items.map((item) => {
          const subtotal = item.price * item.quantity

          return (
            <li key={item.id} className="cart__item">
              <img
                src={item.image}
                alt={item.name}
                className="cart__item-image"
              />
              <div className="cart__item-info">
                <span className="cart__item-name">{item.name}</span>
                <span className="cart__item-unit">
                  ${item.price.toFixed(2)} each
                </span>
                <div className="cart__qty">
                  <button
                    type="button"
                    className="cart__qty-btn"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="cart__qty-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="cart__qty-btn"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="cart__item-price">${subtotal.toFixed(2)}</span>
            </li>
          )
        })}
      </ul>

      <div className="cart__footer">
        <div className="cart__total">
          <span>Total</span>
          <span className="cart__total-amount">${total.toFixed(2)}</span>
        </div>
        <div className="cart__footer-actions">
          <Link to="/browse" className="btn btn--ghost">
            Continue Shopping
          </Link>
          {!showCheckout && (
            <button
              type="button"
              className="btn btn--primary cart__checkout"
              onClick={() => setShowCheckout(true)}
            >
              Checkout
            </button>
          )}
        </div>
      </div>

      {showCheckout && (
        <CheckoutFormFields
          form={form}
          submitted={submitted}
          checkoutTotal={total}
          updateField={updateField}
          onSubmit={handleCheckoutSubmit}
          onCancel={handleCancelCheckout}
        />
      )}
    </section>
  )
}

type CheckoutFormFieldsProps = {
  form: CheckoutForm
  submitted: boolean
  checkoutTotal: number
  updateField: <K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K],
  ) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}

function CheckoutFormFields({
  form,
  submitted,
  checkoutTotal,
  updateField,
  onSubmit,
  onCancel,
}: CheckoutFormFieldsProps) {
  return (
    <form className="checkout" onSubmit={onSubmit}>
      <h2 className="checkout__title">Checkout</h2>

      {submitted ? (
        <p className="checkout__success">
          Thanks, {form.fullName || 'there'}! Your order details were received.
          (Payment processing is not connected yet.)
        </p>
      ) : (
        <>
          <fieldset className="checkout__section">
            <legend>Contact</legend>
            <label className="checkout__field">
              Full name
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
              />
            </label>
            <label className="checkout__field">
              Email
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </label>
            <label className="checkout__field">
              Phone
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset className="checkout__section">
            <legend>Shipping address</legend>
            <label className="checkout__field">
              Street address
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </label>
            <div className="checkout__row">
              <label className="checkout__field">
                City
                <input
                  type="text"
                  name="city"
                  required
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                />
              </label>
              <label className="checkout__field">
                State
                <input
                  type="text"
                  name="state"
                  required
                  value={form.state}
                  onChange={(e) => updateField('state', e.target.value)}
                />
              </label>
              <label className="checkout__field">
                ZIP
                <input
                  type="text"
                  name="zip"
                  required
                  value={form.zip}
                  onChange={(e) => updateField('zip', e.target.value)}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="checkout__section">
            <legend>Payment</legend>
            <label className="checkout__field">
              Payment method
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={(e) =>
                  updateField(
                    'paymentMethod',
                    e.target.value as CheckoutForm['paymentMethod'],
                  )
                }
              >
                <option value="card">Credit / debit card</option>
                <option value="paypal">PayPal</option>
              </select>
            </label>

            {form.paymentMethod === 'card' && (
              <>
                <label className="checkout__field">
                  Name on card
                  <input
                    type="text"
                    name="cardName"
                    required
                    value={form.cardName}
                    onChange={(e) => updateField('cardName', e.target.value)}
                  />
                </label>
                <label className="checkout__field">
                  Card number
                  <input
                    type="text"
                    name="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="•••• •••• •••• ••••"
                    required
                    value={form.cardNumber}
                    onChange={(e) => updateField('cardNumber', e.target.value)}
                  />
                </label>
                <div className="checkout__row">
                  <label className="checkout__field">
                    Expiry
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      required
                      value={form.cardExpiry}
                      onChange={(e) =>
                        updateField('cardExpiry', e.target.value)
                      }
                    />
                  </label>
                  <label className="checkout__field">
                    CVC
                    <input
                      type="text"
                      name="cardCvc"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      required
                      value={form.cardCvc}
                      onChange={(e) => updateField('cardCvc', e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}

            {form.paymentMethod === 'paypal' && (
              <p className="checkout__hint">
                You’ll complete PayPal payment after placing the order.
              </p>
            )}
          </fieldset>

          <div className="checkout__actions">
            <button type="submit" className="btn btn--primary">
              Place order — ${checkoutTotal.toFixed(2)}
            </button>
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </form>
  )
}
