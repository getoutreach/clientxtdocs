import { Manifest } from '@outreach/client-addon-sdk';

export const isUrl = (url: string): boolean => {
    if (!url) {
        return false;
    }

    // eslint-disable-next-line
    return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
        url
    );
};

export const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

export const generalInfoValid = (manifest: Manifest): boolean => {
    return (
        !!manifest &&
        !!manifest.version &&
        !!manifest.identifier &&
        !!manifest.title.en &&
        !!manifest.description.en &&
        !!manifest.author.company &&
        isUrl(manifest.author.privacyUrl) &&
        isUrl(manifest.author.termsOfUseUrl) &&
        isUrl(manifest.author.websiteUrl)
    );
};
