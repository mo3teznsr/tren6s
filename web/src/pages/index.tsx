import BannerCard from '@components/common/banner-card';
import Container from '@components/ui/container';
import BrandGridBlock from '@containers/brand-grid-block';
import CategoryBlock from '@containers/category-block';
import { getLayout } from '@components/layout/layout';
import BannerWithProducts from '@containers/banner-with-products';
import BannerBlock from '@containers/banner-block';
import Divider from '@components/ui/divider';
import DownloadApps from '@components/common/download-apps';
import Support from '@components/common/support';
import Instagram from '@components/common/instagram';
import ProductsFlashSaleBlock from '@containers/product-flash-sale-block';
import ProductsFeatured from '@containers/products-featured';
import BannerSliderBlock from '@containers/banner-slider-block';
import ExclusiveBlock from '@containers/exclusive-block';
import Subscription from '@components/common/subscription';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import { ROUTES } from '@lib/routes';
import {
  masonryBanner,
  promotionBanner,
  modernDemoBanner as banner,
  modernDemoProductBanner as productBanner,
  homeElegantHeroSlider,
  elegantHomeBanner,
} from '@data/static/banners';
import HeroSlider from '@containers/hero-slider';

export { getStaticProps } from '@framework/homepage/modern';

export default function Home() {
  return (
    <>
     <HeroSlider
        data={homeElegantHeroSlider}
        paginationPosition="left"
        buttonClassName="block"
        variant="fullWidth"
        variantRounded="default"
        buttonPosition="inside"
      />
      <BannerBlock data={masonryBanner} />
      <Container>
        <ProductsFlashSaleBlock />
      </Container>
      <BannerSliderBlock data={promotionBanner} />
      <Container>
        <CategoryBlock
          sectionHeading="text-shop-by-category"
          variant="rounded"
        />
        <ProductsFeatured sectionHeading="text-featured-products" />
        <BannerCard
          data={banner[0]}
          href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          classNameInner="aspect-[3.15/1]"
        />
        <BrandGridBlock sectionHeading="text-top-brands" />
        <BannerCard
          data={banner[1]}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          classNameInner="aspect-[4.3/1]"
        />
        <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
          data={productBanner}
        />
        <ExclusiveBlock />
        <BannerCard
          data={elegantHomeBanner}
          href={`${ROUTES.COLLECTIONS}/${elegantHomeBanner.slug}`}
          className="mb-12 md:mb-14 xl:mb-16 pb-0.5 md:pb-0 lg:pb-1 xl:pb-0 md:-mt-2.5"
          classNameInner="aspect-[2/1] md:aspect-[2.9/1]"
        />
        <ProductsFeatured
          sectionHeading="text-featured-products"
          variant="fashion"
          limit={6}
        />
        <NewArrivalsProductFeed />
        {/* <DownloadApps /> */}
        <Support />
        <Instagram />
        <Subscription className="px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16" />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.getLayout = getLayout;
