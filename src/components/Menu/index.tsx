import React, { useContext, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
// import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@calculux-libs/uikit'
import useGetPriceData from 'hooks/useGetPriceData'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  // const cakePriceUsd = usePriceCakeBusd()
  const priceData = useGetPriceData()

  const wakandaAddress = '0x5344C20FD242545F31723689662AC12b9556fC3d'
  const cakePriceUsd =
    priceData && priceData.data && priceData.data[wakandaAddress]
      ? Number(priceData.data[wakandaAddress].price)
      : Number(0)

  useEffect(() => {
    if (!isDark) {
      toggleTheme()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      cakePriceLink="https://www.coingecko.com/en/coins/wakanda-inu"
      links={config}
      {...props}
    />
  )
}

export default Menu
