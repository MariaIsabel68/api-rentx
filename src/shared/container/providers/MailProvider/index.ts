import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
};

// é instanciado no inicio da aplicacao porem tambem como singleton
container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);
