import React from "react";
import { Helmet } from "react-helmet";

import { site } from "../../config/site";

import Pages from "../../components/Layout/pages";

const Contact: React.FC = () => (
  <Pages>
    <Helmet title={`Contato | ${site.title}`} />
  </Pages>
);

export default Contact;
