import {
  AmplifyApiGraphQlResourceStackTemplate,
  AmplifyProjectInfo,
} from '@aws-amplify/cli-extensibility-helper';

export function override(
  resources: AmplifyApiGraphQlResourceStackTemplate,
  amplifyProjectInfo: AmplifyProjectInfo
) {
  resources.models['Room'].modelDDBTable.timeToLiveSpecification = {
    attributeName: 'ttl',
    enabled: true,
  };

  resources.models['Participant'].modelDDBTable.timeToLiveSpecification = {
    attributeName: 'ttl',
    enabled: true,
  };
}
