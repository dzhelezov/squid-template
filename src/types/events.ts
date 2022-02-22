import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v3110 from './v3110'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '9611bd6b933331f197e8fa73bac36184681838292120987fec97092ae037d1c8'
  }

  /**
   *  Transfer succeeded. \[from, to, value\]
   */
  get asV1(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV3110(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '99bc4786247456e0d4a44373efe405e598bfadfac87a7c41b0a82a91296836c1'
  }

  /**
   * Transfer succeeded.
   */
  get asV3110(): {from: v3110.AccountId32, to: v3110.AccountId32, amount: bigint} {
    assert(this.isV3110)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV3110
  }

  get asLatest(): {from: v3110.AccountId32, to: v3110.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV3110
  }
}
