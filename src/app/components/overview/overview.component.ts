import { Component, OnInit } from '@angular/core';
// import { DOCUMENT } from '@angular/platform-browser';

import * as copy from 'copy-to-clipboard';

import { TranslateService } from '@ngx-translate/core';  // Multiple instances created ?
import { WalletService } from '../../services/wallet/wallet.service';
import { MessageService } from '../../services/message/message.service';
import { CoordinatorService } from '../../services/coordinator/coordinator.service';
import { ImplicitAccount, OriginatedAccount, Account } from '../../services/wallet/wallet';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    activeAccount: Account;
    dom: Document;
    implicitAccounts: ImplicitAccount[];
    originatedAccounts: OriginatedAccount[];

    constructor(
        private translate: TranslateService,
        public walletService: WalletService,
        private messageService: MessageService,
        private coordinatorService: CoordinatorService
    ) {
    }

    ngOnInit() {
        if (this.walletService.wallet) {
            this.coordinatorService.startAll();
            this.implicitAccounts = this.walletService.wallet.implicitAccounts;
            console.log(this.implicitAccounts);
        }
    }
    click(account: Account) {
        if (this.activeAccount && this.activeAccount.address === account.address) {
            this.activeAccount = null;
        } else {
            this.activeAccount = account;
        }
        console.log(this.activeAccount ? this.activeAccount.address : 'none');
    }
    dblclick(account: Account) {
        copy(account.address);
        const copyToClipboard = this.translate.instant('OVERVIEWCOMPONENT.COPIEDTOCLIPBOARD');
        this.messageService.add(account.address + ' ' + copyToClipboard, 5);
    }
}
