import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const CNFT_ADDRESS = "BNSE3Fth53PGYCoiNJqjwtGkNTn2UWMmF64L8gA39YB5";
  const CNFT = useUserBalance(CNFT_ADDRESS);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  useEffect(() => {
    const refreshTotal = () => {};

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col span={24}>
        <h2 style={{ display: "inline-flex", alignItems: "center" }}>
          <TokenIcon mintAddress={CNFT_ADDRESS} /> CNFT: {CNFT?.balance} (
          {formatUSD.format(CNFT?.balanceInUSD)})
        </h2>
      </Col>

      <Col span={12}>
        <WalletMultiButton type="ghost" />
      </Col>
      <Col span={24}>
        <div className="builton" />
      </Col>
    </Row>
  );
};
