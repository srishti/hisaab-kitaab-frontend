import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RoutePath } from "../../routes/routes";
import { useHttp } from "../../hooks/http/use-http";
import { Account } from "../../models/account";
import * as httpConfig from "../../hooks/http/http";
import Button from "../../components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AccountListItem from "./AccountListItem";
import styles from "./AccountsList.module.scss";

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const http = useHttp();

  useEffect(() => {
    const requestConfig: httpConfig.RequestConfig = {
      url: httpConfig.BASE_URL + httpConfig.PathParameters.Accounts,
      config: {
        method: httpConfig.HttpMethod.GET,
      },
    };

    const fetchAccountsSuccessCallback = (data: any[]) => {
      console.log("Fetched all accounts successfully!", data);
      setAccounts(data);
    };

    http.sendRequest(requestConfig, fetchAccountsSuccessCallback);
  }, []);

  return (
    <section className={styles["accounts-list"]}>
      <Link to={RoutePath.AddAccount}>
        <Button primary className={styles["add-account-btn"]}>
          <FontAwesomeIcon icon={faPlus} />
          &nbsp; Add Account
        </Button>
      </Link>

      <ul>
        <li className={styles["accounts-list-heading"]}>
          <h4>Account Name</h4>
          <h4>Account Type</h4>
          <h4>Current Balance</h4>
        </li>
        {accounts.map((account) => (
          <AccountListItem
            key={account.id}
            id={account.id}
            currentBalance={account.currentBalance}
            name={account.name}
            type={account.type}
          />
        ))}
      </ul>
    </section>
  );
};

export default Accounts;
